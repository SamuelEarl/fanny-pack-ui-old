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
  import { theme } from "/src/theme";

  export let size = "md";
  export let dateInputIcon = theme.dateInputIcon;

  const dispatch = createEventDispatcher<{ select: undefined }>();


  /** Default date to display in input before value is assigned */
  const defaultDate = new Date();

  // inner date value store for preventing value updates (and also
  // text updates as a result) when date is unchanged
  const innerStore: Writable<Date | null> = writable(null)
  const store = (() => {
    return {
      subscribe: innerStore.subscribe,
      set: (d: Date | null) => {
        if (d === null) {
          innerStore.set(null)
          value = d
        } else if (d.getTime() !== $innerStore?.getTime()) {
          innerStore.set(d)
          value = d
        }
      },
    }
  })()

  /** Date value */
  export let value: Date | null = null
  $: store.set(value)

  /** The earliest value the user can select */
  export let min = new Date(defaultDate.getFullYear() - 20, 0, 1);
  /** The latest value the user can select */
  export let max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999);
  /** Placeholder text to show when input field is empty */
  export let placeholder = "2020-12-31 23:00:00";
  /** Whether the text is valid */
  export let valid = true;

  /** Format string */
  export let format = "yyyy-MM-dd HH:mm:ss"
  let formatTokens = createFormat(format)
  $: formatTokens = createFormat(format)

  /** Locale object for internationalization */
  export let locale: Locale = {}

  function valueUpdate(value: Date | null, formatTokens: FormatToken[]) {
    text = toText(value, formatTokens)
  }
  $: valueUpdate($store, formatTokens)

  export let text = toText($store, formatTokens)
  let textHistory = [text, text]
  $: textHistory = [textHistory[1], text]

  function textUpdate(text: string, formatTokens: FormatToken[]) {
    if (text.length) {
      const result = parse(text, formatTokens, $store)
      if (result.date !== null) {
        valid = true
        store.set(result.date)
      } else {
        valid = false
      }
    } else {
      valid = true // <-- empty string is always valid
      // value resets to null if you clear the field
      if (value) {
        value = null
        store.set(null)
      }
    }
  }
  $: textUpdate(text, formatTokens)

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

  /** Whether the date popup is visible */
  export let visible = false;
  /** Close the date popup when a date is selected */
  export let closeOnSelection = false;

  // handle on:focusout for parent element. If the parent element loses
  // focus (e.g input element), visible is set to false
  function hideCalendar(e: FocusEvent) {
    if (
      e?.currentTarget instanceof HTMLElement &&
      e.relatedTarget &&
      e.relatedTarget instanceof Node &&
      e.currentTarget.contains(e.relatedTarget)
    ) {
      return;
    } 
    else {
      visible = false;
    }
  }

  function keydown(e: KeyboardEvent) {
    if (e.key === "Escape" && visible) {
      visible = false
      e.preventDefault()
      // When the calendar is open, we prevent "Escape" from propagating,
      // so for example a parent modal won't be closed
      e.stopPropagation()
    } 
    else if (e.key === "Enter") {
      visible = !visible
      e.preventDefault()
    }
  }

  function handleSelection(e: CustomEvent<undefined>) {
    dispatch("select", e.detail)
    if (closeOnSelection) {
      visible = false
    }
  }
</script>


<div class="date-picker-container" on:focusout={hideCalendar} on:keydown={keydown}>
  <div class="{`date-input-container ${size}`}">
    <input
      class="{`date-input ${size}`}"
      class:invalid={!valid}
      type="text"
      bind:value={text}
      {placeholder}
      on:focus={() => (visible = true)}
      on:mousedown={() => (visible = true)}
      on:input={handleInput}
    />
    <!--
      You can use tabindex="-1" to give elements that don't normally receive focus the ability to receive focus. I think the tabindex="-1" attribute on the following <div> will give the <div> focus when a user clicks on it. This allows the user to click the button and then click outside of the button to close the calendar. The focus event will bubble up to the parent element (.date-picker-container) where the `on:focusout` event will call `hideCalendar`.
    -->
    <div
      class="{`date-input-btn ${size}`}"
      tabindex="-1"
      on:click={() => visible = !visible}
    >
      <!-- Place strict width and height values to prevent the icon from pushing the button outside of the input container. -->
      <Icon icon="{dateInputIcon}" width="20" height="20" />
    </div>
  </div>
  {#if visible}
    <div class="calendar-container" class:visible transition:fly={{ duration: 80, easing: cubicInOut, y: -5 }}>

      <Calendar
        on:focusout={hideCalendar}
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
      border: var(--fpcl-date-input-border);
      border-radius: var(--fpcl-date-input-radius);

      &:hover {
        box-shadow: var(--fpcl-date-picker-box-shadow, 0 0 2px 2px #e4e4e4);
      }

      &:focus {
        box-shadow: var(--fpcl-date-picker-box-shadow, 0 0 2px 2px #e4e4e4);
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
        background-color: transparent;
        color: var(--fpcl-date-picker-foreground, #000000);
        /* min-width: 0px; */
        /* box-sizing: border-box; */
        transition: all 80ms cubic-bezier(0.4, 0.0, 0.2, 1);

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
        border-left: var(--fpcl-date-input-border);
        border-radius: 0 var(--fpcl-date-input-radius) var(--fpcl-date-input-radius) 0;
        background: var(--fpcl-date-input-btn-background-color, #e4e4e4);
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

  .invalid {
    border: 1px solid rgba(#f92f72, 0.5);
    background-color: rgba(#f92f72, 0.1);

    &:focus {
      border-color: #f92f72;
      box-shadow: 0px 0px 0px 2px rgba(#f92f72, 0.5);
    }
  }

  .calendar-container {
    display: none;
    position: absolute;
    margin-top: 1px;
    z-index: 10;

    &.visible {
      display: block;
    }
  }
</style>
