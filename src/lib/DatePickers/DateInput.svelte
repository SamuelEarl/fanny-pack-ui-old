<script lang="ts">
  import { onMount, createEventDispatcher, tick } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { toText } from "./date-utils";
  import type { Locale } from "./locale";
  import { parse, createFormat } from "./parse";
  import type { FormatToken } from "./parse";
  import Calendar from "./Calendar.svelte";
  import { Label } from "../Labels";
  import { createId } from "../fpui-utils";
  import { theme } from "/src/theme";

  export let label = "";
  export let size = "md";
  export let dateInputIcon = theme.dateInputIcon;
  export let disabled = false;

  const dispatch = createEventDispatcher<{ select: undefined }>();
  let activeDateInput;
  let activeCalendar;
  let componentId = createId();
  let inputFontSize;

  onMount(() => {
    setIconFontSize();
  })

  /** Default date to display in input before value is assigned */
  const currentDate = new Date();

  // inner date value store for preventing value updates (and also
  // text updates as a result) when date is unchanged
  const innerStore: Writable<Date | null> = writable(null);
  const store = (() => {
    return {
      subscribe: innerStore.subscribe,
      set: (d: Date | null) => {
        if (d === null) {
          innerStore.set(null);
          value = d;
        } 
        else if (d.getTime() !== $innerStore?.getTime()) {
          innerStore.set(d);
          value = d;
        }
      },
    }
  })();

  /** Date value */
  export let value: Date | null = null;
  $: store.set(value);

  /** The earliest value the user can select */
  export let min = new Date(currentDate.getFullYear() - 10, 0, 1);
  /** The latest value the user can select */
  export let max = new Date(currentDate.getFullYear() + 10, 11, 31);
  /** Placeholder text to show when input field is empty */
  export let placeholder = "YYYY-MM-DD";
  /** Whether the text is valid */
  export let valid = false;

  /** Format string */
  // export let format = "yyyy-MM-dd HH:mm:ss";
  let format = "yyyy-MM-dd";
  let formatTokens = createFormat(format);
  $: formatTokens = createFormat(format);

  /** Locale object for internationalization */
  export let locale: Locale = {};

  function valueUpdate(value: Date | null, formatTokens: FormatToken[]) {
    text = toText(value, formatTokens);
  }
  $: valueUpdate($store, formatTokens);

  // I am not exporting this `text` prop. If it becomes necessary later, then I will figure out what this prop does and I will export it.
  // export let text = toText($store, formatTokens);
  let text = toText($store, formatTokens);
  let textHistory = [text, text];
  $: textHistory = [textHistory[1], text];

  function textUpdate(text: string, formatTokens: FormatToken[]) {
    if (text.length) {
      const result = parse(text, formatTokens, $store);
      if (result.date !== null) {
        valid = true;
        store.set(result.date);
      } 
      else {
        valid = false;
      }
    } 
    else {
      valid = true; // <-- empty string is always valid
      // value resets to null if you clear the field
      if (value) {
        value = null;
        store.set(null);
      }
    }
  }
  $: textUpdate(text, formatTokens);

  function handleInput(e: unknown) {
    if (
      e instanceof InputEvent &&
      e.inputType === "insertText" &&
      typeof e.data === "string" &&
      text === textHistory[0] + e.data
    ) {
      // check for missing punctuation, and add if there is any
      let result = parse(textHistory[0], formatTokens, $store);
      if (result.missingPunctuation !== "" && !result.missingPunctuation.startsWith(e.data)) {
        text = textHistory[0] + result.missingPunctuation + e.data;
      }
    }
  }

  /** Show or hide the calendar */
  export let showCalendar = false;
  /** Close the date popup when a date is selected */
  export let closeOnSelection = true;

  // handle on:focusout for parent element. If the parent element loses
  // focus (e.g input element), showCalendar is set to false.
  function handleHideCalendar(e: FocusEvent) {
    if (
      e?.currentTarget instanceof HTMLElement &&
      e.relatedTarget &&
      e.relatedTarget instanceof Node &&
      e.currentTarget.contains(e.relatedTarget)
    ) {
      return;
    } 
    else {
      // TODO: Fix this bug: Pass the `closeOnSelection` prop's value as `true`. Then when I click on a date and then try to close the calendar by clicking on the icon button, it does not close after the first click (but it will close after the second click). If I comment out the following line, then the calendar will close after the first button click. So I need to figure out how the FocusEvent that is passed to this function is conflicting with the click event on the icon button. Whatever I come up with, though, needs to be tested to make sure that it does not mess up other scenarios.
      showCalendar = false;
    }
  }

  async function handleKeydown(e: KeyboardEvent) {
    if (showCalendar && (e.key === "Escape" || e.key === "Enter")) {
      showCalendar = false;
      e.preventDefault();
      activeDateInput.blur();
      // When the calendar is open, we prevent "Escape" from propagating,
      // so for example a parent modal won't be closed.
      e.stopPropagation();
    }
  }

  function handleSelection(e: CustomEvent<undefined>) {
    dispatch("select", e.detail);
    if (closeOnSelection) {
      showCalendar = false;
    }
  }

  /**
   * Get the input field's font-size, even if that size is set in a stylesheet:
   * https://stackoverflow.com/a/15195345/9453009
   */
  function setIconFontSize() {
    let dateInputField = document.getElementById(`fpui-date-input-${componentId}`);
    let style = window.getComputedStyle(dateInputField, null).getPropertyValue("font-size");
    inputFontSize = parseFloat(style);
  }
</script>


<Label {label} forVal={`fpui-date-input-${componentId}`} />
<div class="date-picker-container" on:focusout={handleHideCalendar} on:keydown={handleKeydown}>
  <div class="{`fpui-date-input-container ${size}`}" class:showCalendar class:disabled={disabled}>
    <input
      id={`fpui-date-input-${componentId}`}
      class="{`fpui-date-input ${size}`}"
      type="text"
      bind:value={text}
      bind:this={activeDateInput}
      {placeholder}
      on:focus={() => showCalendar = true}
      on:mousedown={async () => {
        showCalendar = true;
        // When a user clicks on the input field, then give the calendar component the focus so the screen will scroll down to show the entire calendar.
        await tick();
        activeCalendar.focus();
      }}
      on:input={handleInput}
      {disabled}
    />
    <!--
      You can use tabindex="-1" to give elements that don't normally receive focus the ability to receive focus. I think the tabindex="-1" attribute on the following <div> will give the <div> focus when a user clicks on it. This allows the user to click the button and then click outside of the button to close the calendar. The focus event will bubble up to the parent element (.date-picker-container) where the `on:focusout` event will call `handleHideCalendar`.
    -->
    <div
      class="{`fpui-date-input-btn ${size}`}"
      class:disabled={disabled}
      tabindex="-1"
      on:click={async () => {
        if (disabled) return;
        showCalendar = !showCalendar;
        // For an explanation of this code, see the comment in the
        // `on:mousedown` event of the `fpui-date-input` element.
        await tick();
        if (showCalendar) activeCalendar.focus();
      }}
    >
      <!-- This <Icon/> element does not inherit the font-size property of its parent component, so I am setting it programmatically. -->
      <Icon icon="{dateInputIcon}" width="{inputFontSize}" />
    </div>
  </div>
  {#if showCalendar}
    <div class="calendar-container" tabindex="-1" bind:this={activeCalendar} class:showCalendar transition:fly|local>
      <div class="triangle-up"></div>
      <Calendar
        on:focusout={handleHideCalendar}
        on:select={handleSelection}
        bind:value={$store}
        {min}
        {max}
        {locale}
        popup={true}
      />
    </div>
  {/if}
</div>

<style>
  .date-picker-container {
    position: relative;

    & .fpui-date-input-container {
      display: flex;
      /* align-items: stretch; */
      border: 1px solid;
      border-color: var(--custom-date-picker-border-color, var(--fpui-date-picker-border-color, #c7c7c7));
      border-radius: var(--fpui-date-picker-border-radius, 3px);
      overflow: hidden;

      &:hover {
        box-shadow: 0 0 0 1px var(--custom-date-picker-border-color, var(--fpui-date-picker-border-color, #c7c7c7));
      }

      &.showCalendar {
        box-shadow: 0 0 0 1px var(--custom-date-picker-border-color, var(--fpui-date-picker-border-color, #c7c7c7));
      }

      &.disabled {
        border-color: var(--disabled-bg-color);
      }

      & .fpui-date-input {
        flex: 1;
        border: none;
        /* This `border-radius` style along with the `overflow: hidden` style in the `.fpui-date-input-container` element will ensure that the background color goes all the way out to the border no matter how high or low the border radius value is. */
        border-radius: calc(var(--fpui-date-picker-border-radius, 3px) - 10px) 0 0 calc(var(--fpui-date-picker-border-radius, 3px) - 10px);
        outline: none;
        background-color: var(--custom-date-picker-bg-color, var(--fpui-date-input-bg-color, #e8e2e7));
        color: var(--custom-date-picker-text-color, var(--fpui-date-picker-text-color, inherit));

        &::placeholder {
          color: var(--custom-date-input-placeholder-text-color, var(--fpui-date-input-placeholder-text-color, lightgray));
        }

        &:disabled {
          background-color: var(--disabled-bg-color);
          color: var(--disabled-text-color);
        }

        /* The following `width` styles are necessary to keep the input field and button contained within their parent element rather than spilling outside of the parent element and hiding the button. */
        /* 
         * 100% is used to cause the input field to span the width of the parent element.
         * The padding values (5px, 10px, 15px) are multiplied by 4 because the input field and the button each have padding applied to each of their left and right sides. NOTE: I don't know if these style calculations actually do anything anymore after I refactored this component. It looks like a simple `width: 100%` will also work. TODO: I need to test these calculations to see if they actually do anything anymore or if I can change them to `width: 100%`.
         * 12px, 16px, and 20px are the width of the icon, depending on the `size` prop. 
         * The border-width value (1px) is multiplied by 3 because there are 3 borders along the horizontal axis of the `.fpui-date-input-container` element.
         */
        &.sm {
          width: calc(100% - (var(--fpui-date-input-btn-padding-sm, 5px) * 4) - 12px - (1px * 3));
          padding: var(--fpui-date-input-btn-padding-sm, 5px);
          font-size: var(--font-size-sm, 12px);
        }
        &.md {
          width: calc(100% - (var(--fpui-date-input-btn-padding-md, 10px) * 4) - 16px - (1px * 3));
          padding: var(--fpui-date-input-btn-padding-md, 10px);
          font-size: var(--font-size-base, 16px);
        }
        &.lg {
          width: calc(100% - (var(--fpui-date-input-btn-padding-lg, 15px) * 4) - 20px - (1px * 3));
          padding: var(--fpui-date-input-btn-padding-lg, 15px);
          font-size: var(--font-size-lg, 20px);
        }
      }

      & .fpui-date-input-btn {
        display: flex;
        align-items: center;
        border-left: 1px solid;
        border-left-color: var(--custom-date-picker-border-color, var(--fpui-date-picker-border-color, #c7c7c7));
        border-radius: 0 calc(var(--fpui-date-picker-border-radius, 3px) - 10px) calc(var(--fpui-date-picker-border-radius, 3px) - 10px) 0;
        background-color: var(--custom-date-input-btn-bg-color, var(--fpui-date-input-btn-bg-color, #cec1cb));
        color: var(--custom-date-input-btn-icon-color, var(--fpui-date-input-btn-icon-color, inherit));
        cursor: pointer;

        &.disabled {
          border-color: var(--disabled-bg-color);
          border-left-color: var(--disabled-text-color);
          background-color: var(--disabled-bg-color);
          color: var(--disabled-text-color);
          pointer-events: none;
        }

        &.sm {
          padding: var(--fpui-date-input-btn-padding-sm, 5px);
        }
        &.md {
          padding: var(--fpui-date-input-btn-padding-md, 10px);
        }
        &.lg {
          padding: var(--fpui-date-input-btn-padding-lg, 15px);
        }
      }
    }
  }

  .calendar-container {
    position: absolute;
    margin-top: 2px;
    z-index: 10;
    outline: none;

    &.showCalendar {
      display: block;
    }

    & .triangle-up {
      width: 10px;
      height: 10px;
      border: 2px solid;
      border-color: var(--fpui-date-picker-border-color, #c7c7c7);
      border-bottom: none;
      border-right: none;
      border-radius: 4px 0 0 0;
      /* Move the triangle down by 5px and over from the left by (border-radius + 10px). */
      margin: 0 auto -5px calc(var(--fpui-date-picker-border-radius, 3px) + 10px);
      background-color: var(--fpui-calendar-bg-color, white);
      transform: rotate(45deg);
      z-index: 100;
    }
  }
</style>
