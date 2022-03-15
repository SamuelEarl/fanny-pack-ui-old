<script lang="ts">
  import { CurrencyInput } from "/src/lib";

  let locale = "en-US";
  let currency = "USD";
  let amount = 0;
  let amount1 = 0;
  let amount2 = 0;
  $: total = amount1 + amount2;
</script>


# Currency Input

---

## Example Usage

<CurrencyInput
  bind:value={amount1}
  locale={locale}
  currency={currency}
  label="Enter the first amount"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>

<CurrencyInput
  bind:value={amount2}
  locale={locale}
  currency={currency}
  label="Enter the second amount"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>

<p><strong>TOTAL: {total}</strong> <em>(value that is returned and that can be saved in a database - number)</em></p>
<p><strong>TOTAL: {new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(total)}</strong> <em>(value that is displayed in the browser - string)</em></p>


```svelte
<script>
  import { CurrencyInput } from "fpcl";

  let amount = 0;
</script>

<CurrencyInput
  bind:value={amount}
  locale="en-US"
  currency="USD"
  label="Enter a dollar amount"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>
```


# NOTES
* It is important to understand that the data type of `value` is `number` (not `string`). So if you want to store the `value`, then it will be a JavaScript `number`. Also, the `toFixed(2)` method is applied to all `value`s and then those `value`s are converted back to a `number` using `Number()`. As such, any insignificant trailing zeros will be cut off from `value`. So `value` could have 0, 1, or 2 decimal places depending on the number that is entered by a user. So it is important to be aware that the value could be an integer or a floating point value when storing these values in a database.
* The number is simply formatted as a string using the [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) before it is displayed in the browser.
