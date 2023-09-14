<!-- TODO: Incorporate the calculateOptionsListHeight function. -->

<!--
  Look at these articles:
  * I like this one because it uses a native select element, which works well on mobile devices, and this approach tries to be as accessible as possible: https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/ 
  * This seems like a good approach, but since ul and li elements are used instead of a native select element, then it won't work as well on mobile devices: https://24ways.org/2019/making-a-better-custom-select-element/
-->
<script>import { onMount, afterUpdate, tick, createEventDispatcher } from "svelte";
import { Label } from "../Labels";
import { createId } from "../fp-utils";
export let label = "";
export let options;
export let optionValue = null;
export let optionLabel = null;
export let optgroup = null;
export let value;
$: console.log("VALUE PROP:", value);
const dispatch = createEventDispatcher();
let selectCustom;
let componentId = createId();
let optionsDataType;
const optgroups = {};
$: dispatch("change", value);
let isActive = false;
onMount(() => {
    determineOptionsDataType(options);
    if (optgroup) {
        sortOptions();
    }
});
afterUpdate(() => {
    determineOptionsDataType(options);
    if (optgroup) {
        sortOptions();
    }
});
function determineOptionsDataType(options2) {
    try {
        if (options2?.length > 0) {
            if (typeof options2[0] === "object") {
                optionsDataType = "object";
            }
            else {
                optionsDataType = "primitive";
            }
        }
    }
    catch (err) {
        console.error("determineOptionsDataType:", err);
    }
}
function sortOptions() {
    try {
        options.sort(function (a, b) {
            if (a[optgroup] !== b[optgroup]) {
                let indexA = options.findIndex((option) => option[optgroup] === a[optgroup]);
                let indexB = options.findIndex((option) => option[optgroup] === b[optgroup]);
                return indexA - indexB;
            }
            else {
                return 0;
            }
        });
        let currentOptgroup = "";
        for (let i = 0; i < options.length; i++) {
            if (currentOptgroup !== options[i][optgroup]) {
                currentOptgroup = options[i][optgroup];
                optgroups[currentOptgroup] = [options[i]];
            }
            else {
                optgroups[currentOptgroup].push(options[i]);
            }
        }
    }
    catch (err) {
        console.error("sortOptions:", err);
    }
}
let selectedOptionIndex = 0;
async function supportKeyboardNavigation(event) {
    if (optionsDataType === "primitive") {
        selectedOptionIndex = options.findIndex((element) => element === value);
    }
    if (optionsDataType === "object") {
        selectedOptionIndex = options.findIndex((element) => element[optionValue] === value);
    }
    if (event.keyCode === 40 && selectedOptionIndex < options.length - 1) {
        event.preventDefault();
        selectedOptionIndex += 1;
    }
    if (event.keyCode === 38 && selectedOptionIndex > 0) {
        event.preventDefault();
        selectedOptionIndex -= 1;
    }
    if (optionsDataType === "primitive") {
        value = options[selectedOptionIndex];
    }
    if (optionsDataType === "object") {
        value = options[selectedOptionIndex][optionValue];
    }
    if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        isActive = !isActive;
    }
    if (event.keyCode === 27) {
        isActive = false;
    }
}
</script>

<!-- If the selectCustom element has focus (i.e. is the `document.activeElement`), 
  then call the `supportKeyboardNavigation` function on `keydown` events. -->
<svelte:document on:keydown={document.activeElement === selectCustom ? supportKeyboardNavigation : null} />

<div class="select">
	<!-- <span class="selectLabel" id={componentId}> Main job role</span> -->
  <Label {label} forVal={`fp-select-btn-${componentId}`} id={componentId} />
	<div class="selectWrapper">
    <!-- elSelectNative -->
    <select 
      class="selectNative js-selectNative" 
      aria-labelledby={componentId}
      bind:value={value}
    >
      {#if optionsDataType === "primitive"}
        {#each options as option}
          <option value={option}>{option}</option>
        {/each}
      {:else if optionsDataType === "object"}
        {#if optgroup}
          {#each Object.entries(optgroups) as [key, value]}
            <optgroup label={key}>
              {#each value as option}
                <option value={option[optionValue]}>{option[optionLabel]}</option>
              {/each}
            </optgroup>
          {/each}
        {:else}
          {#each options as option}
            <option value={option[optionValue]}>{option[optionLabel]}</option>
          {/each}
        {/if}
      {/if}
    </select>

		<!-- Hide the custom select from AT (e.g. SR) using aria-hidden -->
    <!-- elSelectCustom -->
    <!-- 
      In a blur event, the "event.target" is the element that has lost focus.
      When the `selectCustom` element `isActive` (i.e. opened), it receives focus. That allows the `selectCustom` to respond to the `blur` event and set `isActive` to `false when the user clicks outside of it.
    -->
		<div 
      class="selectCustom js-selectCustom"
      class:isActive 
      aria-hidden={isActive}
      tabindex="-1"
      bind:this={selectCustom}
      on:blur={(event) => {
        const selectCustomLostfocus = selectCustom.contains(event.target);
        if (selectCustomLostfocus) {
          isActive = false;
        }
      }}
    >
      <!-- elSelectCustomBox -->
			<div
        class="selectCustom-trigger"
        on:click={async () => {
          isActive = !isActive;
          await tick();
          selectCustom.focus();
        }}
        on:keydown={async () => {
          isActive = !isActive;
          await tick();
          selectCustom.focus();
        }}
      >
      {#if optionsDataType === "primitive"}
        {value}
      {:else if optionsDataType === "object"}
        <!-- When a mouse user selects an option from the selectCustom element, they are setting the `value` prop to equal the `option[optionValue]` property (which is just a primitive value, not the entire object inside the `options` array). But when `optionsDataType === "object"`, then the property that needs to be displayed is the `option[optionLabel]` property. So the code inside the following curly braces will find the object inside the `options` array whose `optionValue` property matches the value that was selected, then it will pull off the value of the `optionLabel` property and return the `optionLabel` property. -->
        <!-- {options.find(obj => obj[optionValue] === value)[optionLabel]} -->
      {/if}
      </div>
      <!-- elSelectCustomOpts -->
			<div class="selectCustom-options">
        {#if optionsDataType === "primitive"}
          {#each options as option}
            <div
              class="selectCustom-option" 
              class:isHighlighted={option === value}
              data-value={option}
              title={option}
              on:click={() => {
                value = option;
                isActive = false;
              }}
              on:keydown={() => {
                value = option;
                isActive = false;
              }}
            >
              {option}
            </div>
          {/each}
        
        {:else if optionsDataType === "object"}
          <!-- List the options under their respective optgroups. -->
          {#if optgroup}
            {#each Object.entries(optgroups) as [key, value]}
              <div 
                class="fp-select-optgroup-label"
                title={key}
              >
                {key}
              </div>
              {#each value as option}
                <div 
                  class="selectCustom-option" 
                  class:isHighlighted={option[optionValue] === value}
                  data-value={option[optionValue]}
                  title={option[optionLabel]}
                  on:click={() => {
                    console.log("option value property:", option[optionValue]);
                    value = option[optionValue];
                    console.log("value:", value);
                    isActive = false;
                  }}
                  on:keydown={() => {
                    value = option[optionValue];
                    isActive = false;
                  }}
                >
                  {option[optionLabel]}
                </div>
              {/each}
            {/each}
          <!-- List the options without optgroups. -->
          {:else}
            {#each options as option}
              <div
                class="selectCustom-option" 
                class:isHighlighted={option[optionValue] === value}
                data-value={option[optionValue]}
                title={option[optionLabel]}
                on:click={() => {
                  value = option[optionValue];
                  isActive = false;
                }}
                on:keydown={() => {
                  value = option[optionValue];
                  isActive = false;
                }}
              >
                {option[optionLabel]}
              </div>
            {/each}
          {/if}
        {/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Both native and custom selects must have the same width/height. */
	.selectNative,
	.selectCustom {
		position: relative;
		width: 22rem;
		height: 4rem;
	}

	/* Make sure the custom select does not mess with the layout */
	.selectCustom {
		position: absolute;
		top: 0;
		left: 0;
		display: none;
	}

	/* This media query detects devices where the primary */
	/* input mechanism can hover over elements. (e.g. computers with a mouse) */
	@media (hover: hover) {
		/* Since we are using a mouse, it's safe to show the custom select. */
		.selectCustom {
			display: block;
		}

		/* In a computer using keyboard? Then let's hide back the custom select */
		/* while the native one is focused: */
		.selectNative:focus + .selectCustom {
			display: none;
		}
	}

	/* Add the focus states too, They matter, always! */
	.selectNative:focus,
	.selectCustom.isActive .selectCustom-trigger {
		outline: none;
		-webkit-box-shadow: white 0 0 0 0.2rem, #ff821f 0 0 0 0.4rem;
		        box-shadow: white 0 0 0 0.2rem, #ff821f 0 0 0 0.4rem;
	}

	/* Rest of the styles to create the custom select. */
	/* Just make sure the native and the custom have a similar "box" (the trigger). */

	.select {
		position: relative;
	}

	/* .selectLabel {
		display: block;
		font-weight: bold;
		margin-bottom: 0.4rem;
	} */

	.selectWrapper {
		position: relative;
	}

	.selectNative,
	.selectCustom-trigger {
		font-size: 1.6rem;
		background-color: #fff;
		border: 1px solid #6f6f6f;
		border-radius: 0.4rem;
	}

	.selectNative {
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: 100%;
		background-position-y: 0.8rem;
		padding: 0rem 0.8rem;
	}

	.selectCustom-trigger {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding: 0.8rem 0.8rem;
		cursor: pointer;
	}

	.selectCustom-trigger::after {
		content: '▾';
		position: absolute;
		top: 0;
		line-height: 3.8rem;
		right: 0.8rem;
	}

	.selectCustom-trigger:hover {
		border-color: #8c00ff;
	}

	.selectCustom-options {
		position: absolute;
		top: calc(3.8rem + 0.8rem);
		left: 0;
		width: 100%;
		border: 1px solid #6f6f6f;
		border-radius: 0.4rem;
		background-color: #fff;
		-webkit-box-shadow: 0 0 4px #e9e1f8;
		        box-shadow: 0 0 4px #e9e1f8;
		z-index: 1;
		padding: 0.8rem 0;
		display: none;
	}

	.selectCustom.isActive .selectCustom-options {
		display: block;
	}

	.selectCustom-option {
		position: relative;
		padding: 0.8rem;
		padding-left: 2.5rem;
	}

	.selectCustom-option.isHighlighted,
	.selectCustom-option:hover {
		background-color: #865bd7; /* contrast AA */
		color: white;
		cursor: default;
	}

	.selectCustom-option:not(:last-of-type)::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		border-bottom: 1px solid #d3d3d3;
	}

	.selectCustom-option.isActive::before {
		content: '✓';
		position: absolute;
		left: 0.8rem;
	}</style>
