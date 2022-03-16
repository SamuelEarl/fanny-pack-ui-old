<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { Writable, writable } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { toText } from "./date-utils";
  import type { Locale } from "./locale";
  import { parse, createFormat } from "./parse";
  import type { FormatToken } from "./parse";
  import Calendar from "./Calendar.svelte";
  import Label from "../Labels/Label.svelte";
  import { createId } from "../utils";
  import { theme } from "/src/theme";

  export let label;
  export let size = "md";
  export let dateInputIcon = theme.dateInputIcon;

  const dispatch = createEventDispatcher<{ select: undefined }>();
  let componentId = createId();


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

  export let text = toText($store, formatTokens);
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
  // focus (e.g input element), showCalendar is set to false
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
      showCalendar = false;
    }
  }

  function keydown(e: KeyboardEvent) {
    if (e.key === "Escape" && showCalendar) {
      showCalendar = false;
      e.preventDefault();
      // When the calendar is open, we prevent "Escape" from propagating,
      // so for example a parent modal won't be closed
      e.stopPropagation();
    } 
    else if (e.key === "Enter") {
      showCalendar = !showCalendar;
      e.preventDefault();
    }
  }

  function handleSelection(e: CustomEvent<undefined>) {
    dispatch("select", e.detail)
    if (closeOnSelection) {
      showCalendar = false;
    }
  }
</script>


<Label {label} forId={`fpcl-date-input-${componentId}`} />
<div class="date-picker-container" on:focusout={handleHideCalendar} on:keydown={keydown}>
  <div class="{`date-input-container ${size}`}">
    <input
      id={`fpcl-date-input-${componentId}`}
      class="{`date-input ${size}`}"
      type="text"
      bind:value={text}
      {placeholder}
      on:focus={() => (showCalendar = true)}
      on:mousedown={() => (showCalendar = true)}
      on:input={handleInput}
    />
    <!--
      You can use tabindex="-1" to give elements that don't normally receive focus the ability to receive focus. I think the tabindex="-1" attribute on the following <div> will give the <div> focus when a user clicks on it. This allows the user to click the button and then click outside of the button to close the calendar. The focus event will bubble up to the parent element (.date-picker-container) where the `on:focusout` event will call `handleHideCalendar`.
    -->
    <div
      class="{`date-input-btn ${size}`}"
      tabindex="-1"
      on:click={() => showCalendar = !showCalendar}
    >
      <!-- The user might choose a custom icon that is larger than the one used in the demos, so it is necessary to place strict width and height values to prevent the icon from pushing the button outside of the input container. -->
      <Icon
        icon="{dateInputIcon}"
        width={size === "sm" ? "12" : size === "md" ? "16" : size === "lg" ? "21" : "16"} 
        height={size === "sm" ? "12" : size === "md" ? "16" : size === "lg" ? "21" : "16"} 
      />
    </div>
  </div>
  {#if showCalendar}
    <div class="calendar-container" class:showCalendar transition:fly={{ duration: 80, easing: cubicInOut, y: -5 }}>
      <div class="triangle-up"></div>
      <Calendar
        on:focusout={handleHideCalendar}
        on:select={handleSelection}
        bind:value={$store}
        {min}
        {max}
        {locale}
      />
    </div>
  {/if}
</div>

<style>
  .date-picker-container {
    position: relative;

    & .date-input-container {
      display: flex;
      align-items: center;
      border-width: var(--fpcl-date-picker-border-width, 1px);
      border-style: var(--fpcl-date-picker-border-style, solid);
      border-color: var(--fpcl-date-picker-border-color, #c7c7c7);
      border-radius: var(--fpcl-date-picker-border-radius, 3px);
      overflow: hidden;

      &:hover {
        box-shadow: var(--fpcl-date-picker-box-shadow, 0 0 0 1px gray);
      }

      &:focus {
        box-shadow: var(--fpcl-date-picker-box-shadow, 0 0 0 1px gray);
      }

      & .date-input {
        flex: 1;
        border: none;
        /* This `border-radius` style along with the `overflow: hidden` style in the `.date-input-container` element will ensure that the background color goes all the way out to the border no matter how high or low the border radius value is. */
        border-radius: calc(var(--fpcl-date-picker-border-radius, 3px) - 10px) 0 0 calc(var(--fpcl-date-picker-border-radius, 3px) - 10px);
        outline: none;
        background-color: var(--fpcl-date-picker-bg-color, white);
        color: var(--fpcl-date-picker-text-color, inherit);

        /* The following `width` styles are necessary to keep the input field and button contained within their parent element rather than spilling outside of the parent element and hiding the button. */
        /* 
         * 100% is used to cause the input field to span the width of the parent element.
         * The `--fpcl-date-input-padding-x` is multiplied by 4 because the input field and the button each have padding applied to each of their sides. 
         * 12px, 16px, and 21px are the width of the icon, depending on the `size` prop. 
         * The `var(--fpcl-date-picker-border-width)` is multiplied by 3 because there are 3 borders along the horizontal axis of the `.date-input-container` element.
         */
        &.sm {
          width: calc(100% - ((var(--fpcl-date-input-padding-sm, 5px) * 4) - 12px - (var(--fpcl-date-picker-border-width, 1px) * 3)));
          padding: var(--fpcl-date-input-padding-sm, 5px);
          font-size: var(--fpcl-font-size-sm, 12px);
        }
        &.md {
          width: calc(100% - ((var(--fpcl-date-input-padding-md, 10px) * 4) - 16px - (var(--fpcl-date-picker-border-width, 1px) * 3)));
          padding: var(--fpcl-date-input-padding-md, 10px);
          font-size: var(--fpcl-font-size-base, 16px);
        }
        &.lg {
          width: calc(100% - ((var(--fpcl-date-input-padding-lg, 15px) * 4) - 21px - (var(--fpcl-date-picker-border-width, 1px) * 3)));
          padding: var(--fpcl-date-input-padding-lg, 15px);
          font-size: var(--fpcl-font-size-lg, 20px);
        }
      }

      & .date-input-btn {
        display: flex;
        align-items: center;
        border-left-width: var(--fpcl-date-picker-border-width, 1px);
        border-left-style: var(--fpcl-date-picker-border-style, solid);
        border-left-color: var(--fpcl-date-picker-border-color, #c7c7c7);
        border-radius: 0 calc(var(--fpcl-date-picker-border-radius, 3px) - 10px) calc(var(--fpcl-date-picker-border-radius, 3px) - 10px) 0;
        background: var(--fpcl-date-input-btn-bg-color, #e5e5e5);
        color: var(--fpcl-date-input-btn-icon-color, inherit);
        cursor: pointer;

        &.sm {
          padding: calc(var(--fpcl-date-input-padding-sm, 5px) + 1px);
        }
        &.md {
          padding: calc(var(--fpcl-date-input-padding-md, 10px) + 1px);
        }
        &.lg {
          padding: calc(var(--fpcl-date-input-padding-lg, 15px) + 1px);
        }
      }
    }
  }

  .calendar-container {
    position: absolute;
    margin-top: 2px;
    z-index: 10;

    &.showCalendar {
      display: block;
    }

    & .triangle-up {
      width: 10px;
      height: 10px;
      border-width: var(--fpcl-date-picker-border-width, 1px);
      border-style: var(--fpcl-date-picker-border-style, solid);
      border-color: var(--fpcl-date-picker-border-color, #c7c7c7);
      border-bottom: none;
      border-right: none;
      border-radius: 4px 0 0 0;
      /* Move the triangle down by 5px and over from the left by (border-radius + 10px). */
      margin: 0 auto -5px calc(var(--fpcl-date-picker-border-radius, 3px) + 10px);
      background-color: var(--fpcl-date-picker-bg-color, white);
      transform: rotate(45deg);
      z-index: 100;
    }
  }
</style>
