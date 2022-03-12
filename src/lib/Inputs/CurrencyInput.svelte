<!--
  TODOS:
  * Add international currency support with the ECMAScript Internationalization API (Intl.NumberFormat) (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat). I can add this with props.
  * Handle non-numeric characters being passed in.
-->

<script>
  import { tick } from "svelte";
  
  // TODO: This initial value needs to be dynamically generated based on the international value that is passed in as props. Right now it is hard coded as a USD amount.
	let formattedAmount = "0.00";
  $: console.log("formattedAmount: " + formattedAmount);
  // Use the `toFixed()` method to handle decimal numbers. See https://javascript.info/number#imprecise-calculations.
  let currencyInput;

	let handleChange = () => {
    console.log("currentInput: " + currencyInput.value);

    let cleanedInput = currencyInput.value
      .replace(/\D*/gm, "") // remove non digits
      .replace(/^0+/gm, ""); // remove leading zeros 
    console.log("cleanedInput.length: " + cleanedInput.length);

    // formattedAmount = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(cleanedInput);
    

    // if (cleanedInput.length === 0 ) {
    //   console.log("setting formattedAmount to 0.00 --- BUT IT does not work ");
    //   formattedAmount = "0.00"; // ERROR this never works
    // } 
    // else {
    //   formattedAmount = (parseInt(cleanedInput, 10) / 100).toString();
    // }
  };

  /**
   * Unfocus the input field when a user presses "Enter".
   * If a user deletes the number in the input and does not enter another number in its place, then the number will be `null` and the income amount (`getBudgetData.income[index].amount`) will be removed from the `budgetData` object. The next time the user loads this page that missing income amount property will be `undefined`, which will cause the dollar amount that is displayed to the user to be `$NaN`. The `if` statement inside this `unfocus` method prevents that by setting any income amounts that are either `null` or `undefined` back to their default value of 0.
   */
  async function unfocus(event) {
    console.log("VALUE:", currencyInput.value);
    if (!currencyInput.value) {
      currencyInput.value = "0.00";
      // If a user clears out the number in the currency input, then `0.00` will be displayed in the input field. So highlight the `0.00` to make it easier for the user to enter a new value.
      await tick();
      currencyInput.select();
    }

    // If the user presses "Enter" (13) or "Esc" (27), then unfocus the input using the "blur" event.
    if (event.keyCode === 13 || event.keyCode === 27) {
      formatAmount();
      currencyInput.blur();
    }
  }

  function formatAmount() {
    formattedAmount = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(currencyInput.value);
  }
</script>


<input
  type="text"
  value={formattedAmount}
  bind:this={currencyInput}
  on:input={handleChange}
  on:click={() => currencyInput.select()}
  on:keyup={unfocus}
  on:blur={unfocus}
/>
