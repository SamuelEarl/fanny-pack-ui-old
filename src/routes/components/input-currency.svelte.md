<script lang="ts">
  import { CurrencyInput } from "/src/lib";

  let amount = 0;
</script>


# Currency Input

---

## Example Usage

<p>Amount: {amount}</p>

<CurrencyInput
  bind:value={amount}
  locale="en-US"
  currency="USD"
  label="Enter a dollar amount"
  placeholder="Type right here"
  width="full"
  disabled={false}
/>

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
  placeholder="Type right here"
  width="full"
  disabled={false}
/>
```


# NOTES
It is important to understand that the data type of `value` is `number` (not `string`). So if you want to store the `value`, then it will be a JavaScript `number`. Also, the `toFixed(2)` method is applied to all `value`s and then those `value`s are converted back to a `number` using `Number()`. As such, any insignificant trailing zeros will be cut off from `value`. So `value` could have 0, 1, or 2 decimal places depending on the number that is entered by a user. So it is important to be aware that the value could be an integer or a floating point value when storing these values in a database.
