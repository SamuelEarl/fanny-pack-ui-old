<script>import { onMount, createEventDispatcher, tick } from "svelte";
import { fly } from "svelte/transition";
import { cubicInOut } from "svelte/easing";
import { writable } from "svelte/store";
import Icon from "@iconify/svelte";
import { toText } from "./date-utils";
import { parse, createFormat } from "./parse";
import Calendar from "./Calendar.svelte";
import { Label } from "../Labels";
import { createId } from "../fp-utils";
export let label = "";
export let padding = "var(--date-picker-default-padding-v) var(--date-picker-default-padding-h)";
export let fontSize = "var(--date-picker-default-font-size)";
export let dateInputIcon = "mdi:calendar";
export let disabled = false;
const dispatch = createEventDispatcher();
let activeDateInput;
let activeCalendar;
let componentId = createId();
let inputFontSize;
onMount(() => {
    setIconFontSize();
});
const innerStore = writable(null);
const store = (() => {
    return {
        subscribe: innerStore.subscribe,
        set: (d) => {
            if (d === null) {
                innerStore.set(null);
                value = d;
            }
            else if (d.getTime() !== $innerStore?.getTime()) {
                innerStore.set(d);
                value = d;
            }
        }
    };
})();
export let value = null;
$: store.set(value);
const currentDate = /* @__PURE__ */ new Date();
export let min = new Date(currentDate.getFullYear() - 10, 0, 1);
export let max = new Date(currentDate.getFullYear() + 10, 11, 31);
export let placeholder = "YYYY-MM-DD";
export let valid = false;
let format = "yyyy-MM-dd";
let formatTokens = createFormat(format);
$: formatTokens = createFormat(format);
export let locale = {};
function valueUpdate(value2, formatTokens2) {
    text = toText(value2, formatTokens2);
}
$: valueUpdate($store, formatTokens);
let text = toText($store, formatTokens);
let textHistory = [text, text];
$: textHistory = [textHistory[1], text];
function textUpdate(text2, formatTokens2) {
    if (text2.length) {
        const result = parse(text2, formatTokens2, $store);
        if (result.date !== null) {
            valid = true;
            store.set(result.date);
        }
        else {
            valid = false;
        }
    }
    else {
        valid = true;
        if (value) {
            value = null;
            store.set(null);
        }
    }
}
$: textUpdate(text, formatTokens);
function handleInput(e) {
    if (e instanceof InputEvent && e.inputType === "insertText" && typeof e.data === "string" && text === textHistory[0] + e.data) {
        let result = parse(textHistory[0], formatTokens, $store);
        if (result.missingPunctuation !== "" && !result.missingPunctuation.startsWith(e.data)) {
            text = textHistory[0] + result.missingPunctuation + e.data;
        }
    }
}
export let showCalendar = false;
export let closeOnSelection = true;
function handleHideCalendar(e) {
    if (e?.currentTarget instanceof HTMLElement && e.relatedTarget && e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) {
        return;
    }
    else {
        showCalendar = false;
    }
}
async function handleKeydown(e) {
    if (showCalendar && (e.key === "Escape" || e.key === "Enter")) {
        showCalendar = false;
        e.preventDefault();
        activeDateInput.blur();
        e.stopPropagation();
    }
}
function handleSelection(e) {
    dispatch("select", e.detail);
    if (closeOnSelection) {
        showCalendar = false;
    }
}
function setIconFontSize() {
    let dateInputField = document.getElementById(`fp-date-input-${componentId}`);
    let style = window.getComputedStyle(dateInputField, null).getPropertyValue("font-size");
    inputFontSize = parseFloat(style);
}
</script>


<Label {label} forVal={`fp-date-input-${componentId}`} />
<div class="date-picker-container" on:focusout={handleHideCalendar} on:keydown={handleKeydown}>
  <div
    class="fp-date-input-container" 
    class:showCalendar 
    class:disabled={disabled}
  >
    <input
      id={`fp-date-input-${componentId}`}
      class="fp-date-input"
      style={`font-size:${fontSize}; padding:${padding};`}
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
      class="fp-date-input-btn"
      class:disabled={disabled}
      style={`padding:${padding};`}
      tabindex="-1"
      on:click={async () => {
        if (disabled) return;
        showCalendar = !showCalendar;
        // For an explanation of this code, see the comment in the
        // `on:mousedown` event of the `fp-date-input` element.
        await tick();
        if (showCalendar) activeCalendar.focus();
      }}
    >
      <!-- This <Icon/> element does not inherit the font-size property of its parent component, so I am setting it programmatically. -->
      <Icon icon="{dateInputIcon}" width="{inputFontSize}" />
    </div>
  </div>
  {#if showCalendar}
    <div class="calendar-container" tabindex="-1" bind:this={activeCalendar} class:showCalendar transition:fly>
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
    /* width: 100%; */
  }

  .date-picker-container .fp-date-input-container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border: var(--border-width-default) var(--border-style-default) var(--border-color-default);
      border: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-border-color, var(--border-color-default));
      border-radius: var(--border-radius);
      overflow: hidden;
    }

  .date-picker-container .fp-date-input-container:hover {
        -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
                box-shadow: 0 0 0 2px var(--border-color-default);
        -webkit-box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
                box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
      }

  .date-picker-container .fp-date-input-container.showCalendar {
        -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
                box-shadow: 0 0 0 2px var(--border-color-default);
        -webkit-box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
                box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
      }

  .date-picker-container .fp-date-input-container.disabled {
        border-color: var(--border-color-disabled);
        pointer-events: none;
      }

  .date-picker-container .fp-date-input-container .fp-date-input {
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        width: 100%;
        border: none;
        /* This `border-radius` style along with the `overflow: hidden` style in the `.fp-date-input-container` element will ensure that the background color goes all the way out to the border no matter how high or low the border radius value is. */
        border-radius: calc(var(--border-radius) - 10px) 0 0 calc(var(--border-radius) - 10px);
        outline: none;
        background-color: var(--bg-color-element-default);
        background-color: var(--custom-date-picker-bg-color, var(--bg-color-element-default));
        color: inherit;
        color: var(--custom-date-picker-text-color, inherit);
      }

  .date-picker-container .fp-date-input-container .fp-date-input::-webkit-input-placeholder {
          color: var(--placeholder-color-default);
          color: var(--custom-date-input-placeholder-text-color, var(--placeholder-color-default));
        }

  .date-picker-container .fp-date-input-container .fp-date-input::-moz-placeholder {
          color: var(--placeholder-color-default);
          color: var(--custom-date-input-placeholder-text-color, var(--placeholder-color-default));
        }

  .date-picker-container .fp-date-input-container .fp-date-input:-ms-input-placeholder {
          color: var(--placeholder-color-default);
          color: var(--custom-date-input-placeholder-text-color, var(--placeholder-color-default));
        }

  .date-picker-container .fp-date-input-container .fp-date-input::-ms-input-placeholder {
          color: var(--placeholder-color-default);
          color: var(--custom-date-input-placeholder-text-color, var(--placeholder-color-default));
        }

  .date-picker-container .fp-date-input-container .fp-date-input::placeholder {
          color: var(--placeholder-color-default);
          color: var(--custom-date-input-placeholder-text-color, var(--placeholder-color-default));
        }

  .date-picker-container .fp-date-input-container .fp-date-input:disabled {
          background-color: var(--bg-color-element-disabled);
          color: var(--text-color-disabled);
        }

  .date-picker-container .fp-date-input-container .fp-date-input-btn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        border-left: var(--border-default);
        border-radius: 0 calc(var(--border-radius) - 10px) calc(var(--border-radius) - 10px) 0;
        background-color: var(--border-color-default);
        background-color: var(--custom-date-input-btn-bg-color, var(--border-color-default));
        color: inherit;
        color: var(--custom-date-input-btn-icon-color, inherit);
        cursor: pointer;
      }

  .date-picker-container .fp-date-input-container .fp-date-input-btn.disabled {
          border-color: var(--border-color-disabled);
          border-left-color: var(--text-color-disabled);
          background-color: var(--bg-color-element-disabled);
          color: var(--text-color-disabled);
          pointer-events: none;
        }

  .calendar-container {
    position: absolute;
    margin-top: 2px;
    z-index: 10;
    outline: none;
  }

  .calendar-container.showCalendar {
      display: block;
    }

  .calendar-container .triangle-up {
      width: 10px;
      height: 10px;
      border: 2px solid;
      border-color: var(--border-color-default);
      border-bottom: none;
      border-right: none;
      border-radius: 4px 0 0 0;
      /* Move the triangle down by 5px and over from the left by (border-radius + 10px). */
      margin: 0 auto -5px calc(var(--border-radius) + 10px);
      background-color: var(--white);
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
      z-index: 100;
    }</style>
