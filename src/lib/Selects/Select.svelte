<!--
  Look at these articles:
  * I like this one because it uses a native select element, which works well on mobile devices, and this approach tries to be as accessible as possible: https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/ 
  * This seems like a good approach, but since ul and li elements are used instead of a native select element, then it won't work as well on mobile devices: https://24ways.org/2019/making-a-better-custom-select-element/
-->
<script lang="ts">
  import { tick } from "svelte";
  import { Label } from "../Labels";
  import { createId } from "$lib/fp-utils";

  export let label = "";
  export let options;
  // export let optionLabel = null;
  // export let optgroup = null;
  export let value;

  let componentId = createId();
  let selectCustom;

	// let selectedOption = options[0];
  // $: selectedOptionIndex = options.findIndex(element => element === selectedOption);
  $: selectedOptionIndex = options.findIndex(element => element === value);

  let isActive = false;
  $: console.log("isActive:", isActive);

  async function supportKeyboardNavigation(event) {
    if (document.activeElement === selectCustom) {
      // press down -> go next
      if (event.keyCode === 40 && selectedOptionIndex < options.length - 1) {
        event.preventDefault(); // prevent page scrolling
        value = options[selectedOptionIndex + 1]
      }

      // press up -> go previous
      if (event.keyCode === 38 && selectedOptionIndex > 0) {
        event.preventDefault(); // prevent page scrolling
        value = options[selectedOptionIndex - 1]
      }

      // press Enter or space -> select the option
      if (event.keyCode === 13 || event.keyCode === 32) {
        console.log("KEYPRESS:", event.keyCode);
        event.preventDefault();
        value = options[selectedOptionIndex];
        isActive = !isActive;
      }

      // press ESC -> close selectCustom
      if (event.keyCode === 27) {
        isActive = false;
      }
    }
  }
</script>

<svelte:window on:keydown={supportKeyboardNavigation} />

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
			<!-- <option value="sel" disabled="" selected="">
        {selectedOption}
      </option> -->
			<!-- <option value="ds">UI/UX Designer</option>
			<option value="fe">Frontend Engineer</option>
			<option value="be">Backend Engineer</option>
			<option value="qa">QA Engineer</option>
			<option value="un">Unicorn</option> -->
      {#each options as option}
        <option value={option}>{option}</option>
      {/each}
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
        {value}
      </div>
      <!-- elSelectCustomOpts -->
			<div class="selectCustom-options">
				<!-- <div class="selectCustom-option" data-value="ds">UI/UX Designer</div>
				<div class="selectCustom-option" data-value="fe">Frontend Engineer</div>
				<div class="selectCustom-option" data-value="be">Backend Engineer</div>
				<div class="selectCustom-option" data-value="qa">QA Engineer</div>
				<div class="selectCustom-option" data-value="un">Unicorn</div> -->
        {#each options as option}
          <div
            class="selectCustom-option" 
            class:isHover={option === value}
            data-value={option}
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
			</div>
		</div>
	</div>
</div>

Selected Option: {value}

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

	.selectCustom-option.isHover,
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
	}
</style>
