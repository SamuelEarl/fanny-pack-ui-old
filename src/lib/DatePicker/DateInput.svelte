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
  const defaultDate = new Date();

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
  let min = new Date(defaultDate.getFullYear() - 100, 0, 1);
  /** The latest value the user can select */
  let max = new Date(defaultDate.getFullYear() + 100, 11, 31, 23, 59, 59, 999);
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
      <!-- Place strict width and height values to prevent the icon from pushing the button outside of the input container. -->
      <Icon icon="{dateInputIcon}" width="20" height="20" />
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
      width: var(--fpcl-date-input-width, 148px);
      display: flex;
      align-items: center;
      border: var(--fpcl-date-picker-border, 1px solid #c7c7c7);
      border-radius: var(--fpcl-date-picker-border-radius, 3px);

      &:hover {
        box-shadow: var(--fpcl-date-picker-box-shadow, 0 0 2px 2px #e5e5e5);
      }

      &:focus {
        box-shadow: var(--fpcl-date-picker-box-shadow, 0 0 2px 2px #e5e5e5);
      }

      /* This min-width style will prevent the input field styles from breaking. */
      /* 85px is the width of the date text (which should be wide enough to fit any properly formatted date entry). The padding is multiplied by 4 because the input field and the button each have padding applied to each of their sides. 20px is the width of the icon. 3px is the width of the 3 borders. */
      &.sm {
        min-width: calc(85px + (var(--fpcl-date-input-sm-padding, 5px) * 4) + 20px + 3px);
      }
      &.md {
        min-width: calc(85px + (var(--fpcl-date-input-md-padding, 10px) * 4) + 20px + 3px);
      }
      &.lg {
        min-width: calc(85px + (var(--fpcl-date-input-lg-padding, 15px) * 4) + 20px + 3px);
      }

      & .date-input {
        flex: 1;
        /* The .date-input field's min-width is the same as the first variable in the calc() function above. */
        min-width: 85px;
        border: none;
        margin: 0px;
        outline: none;
        background-color: var(--fpcl-date-input-bg-color, white);
        color: var(--fpcl-date-input-text-color, inherit);

        &.sm {
          padding: var(--fpcl-date-input-sm-padding, 5px);
        }
        &.md {
          padding: var(--fpcl-date-input-md-padding, 10px);
        }
        &.lg {
          padding: var(--fpcl-date-input-lg-padding, 15px);
        }
      }

      & .date-input-btn {
        display: flex;
        align-items: center;
        border-left: var(--fpcl-date-picker-border, 1px solid #c7c7c7);
        border-radius: 0 calc(var(--fpcl-date-picker-border-radius) - 3px) calc(var(--fpcl-date-picker-border-radius) - 3px) 0;
        background: var(--fpcl-date-input-btn-bg-color, #e5e5e5);
        color: var(--fpcl-date-input-btn-icon-color, inherit);
        cursor: pointer;

        &.sm {
          padding: var(--fpcl-date-input-sm-padding, 5px);
        }
        &.md {
          padding: var(--fpcl-date-input-md-padding, 10px);
        }
        &.lg {
          padding: var(--fpcl-date-input-lg-padding, 15px);
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
      border-top: var(--fpcl-date-picker-border, 1px solid #c7c7c7);
      border-left: var(--fpcl-date-picker-border, 1px solid #c7c7c7);
      border-radius: 4px 0 0 0;
      margin: 0 0 -5px 10px;
      background-color: var(--fpcl-date-picker-bg-color, white);
      transform: rotate(45deg);
      z-index: 100;
    }
  }
</style>
