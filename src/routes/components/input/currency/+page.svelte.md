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
  valAlign="right"
  locale={locale}
  currency={currency}
  label="Enter a dollar amount"
  labelAlign="right"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>

```svelte
<script>
  import { CurrencyInput } from "@fanny-pack-ui/svelte-kit";

  let amount = 0;
</script>

<CurrencyInput
  bind:value={amount}
  valAlign="right"
  locale="en-US"
  currency="USD"
  label="Enter a dollar amount"
  labelAlign="right"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>
```

<hr>

## Return Value Demo

<div id="return-value-demo">
  <div id="currency">
    <div id="curr-title">Currency Input Components</div>
    <div id="curr1">
      <CurrencyInput
        bind:value={amount1}
        locale={locale}
        currency={currency}
        size="md"
        placeholder="Type right here"
        disabled={false}
      />
    </div>
    <div id="curr-plus">+</div>
    <div id="curr2">
      <CurrencyInput
        bind:value={amount2}
        locale={locale}
        currency={currency}
        size="md"
        placeholder="Type right here"
        disabled={false}
      />
    </div>
    <div id="curr-total">{new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(total)}</div>
  </div>

  <div id="return-value">
    <div id="rv-title">Return Value</div>
    <div id="rv1">{amount1}</div>
    <div id="rv-plus">+</div>
    <div id="rv2">{amount2}</div>
    <div id="rv-total">{total}</div>
  </div>
</div>

<br>

*NOTE: The **Return Value** example above shows the value that is returned from this component. This is the value that you would use to run calculations or that you would send to the backend for processing or to store in a database. This value is a `number` data type.*

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `bind:value` | `number` | any number | `0` | In order for the input field to be updated with a `number` value, this component's `value` property needs to be bound to a `number` variable.<br><br>It is important to understand that the data type of `value` is `number` (not `string`). So if you want to store the `value`, then it will be a JavaScript `number`. Also, the `toFixed(2)` method is applied to all `value`s and then those `value`s are converted back to a `number` using `Number()`. So any insignificant trailing zeros will be cut off from `value`. So `value` could have 0, 1, or 2 decimal places depending on the number that is entered by a user. So it might be important to know that the value could be an integer or a floating point value when storing these values in a database.<br><br> The number is simply formatted as a string using the [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) before it is displayed in the browser. |
| `valAlign` | `string` | `left`, `right` | `right` | This prop will align the value in the input field either to left or the right side of the input field. |
| `locale` | `string` | Any locale identifier string. See [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) for more details. | `en-US` | This prop is the locale identifier string that will format the currency value to the correct format. |
| `currency` | `string` | Any acceptable currency string. See [Intl.NumberFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for more details. | `USD` | This prop is the currency to use in currency formatting. |
| `label` | `string` | Any string | NA | This prop will provide a label for the input field. |
| `labelAlign` | `string` | `left`, `right` | `right` | This prop will align the label for the input field either to left or the right side of the input field. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for the input field to give the appearance of a larger or smaller input field. The text size will also increase or decrease based on this `size` prop. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the input field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the input field. |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the input field and then the input field loses focus. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the input field. |
| `on:blur` | This component dispatches a custom `blur` event rather than forwarding the `blur` DOM event. This is because the `blur` event is used internally in this component so the `blur` event cannot be forwarded. The main difference when listening for and handling the `blur` event in this component is that, since the `blur` event is dispatched, you will find the `blur` event on the `event.detail` object rather than the `event` object. For example:<br><br>`function handlerFunction(event) {`<br>`&nbsp;&nbsp;console.log("Blur Event:", event.detail)};`<br>`}`<br><br>`<CurrencyInput on:blur={handlerFunction} />` |


<style>
  #return-value-demo {
    display: flex;

    & #currency {
      margin-right: 150px;

      & #curr-total {
        padding-right: 11px;
      }
    }

    & #rv1, & #rv2 {
      padding-bottom: 11px;
    }

    & #currency, & #return-value {
      display: grid;
      align-items: end;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr 1fr;

      & #curr-title, & #rv-title {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        text-align: center;
        margin-bottom: 20px;
        font-weight: bold;
      }
      & #curr1, & #rv1 {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        text-align: right;
        margin-bottom: 5px;
      }
      & #curr-plus, & #rv-plus {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        padding-right: 25px;
        padding-bottom: 11px;
      }
      & #curr2, & #rv2 {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        text-align: right;
      }
      & #curr-total, & #rv-total {
        grid-column: 1 / 3;
        grid-row: 4 / 5;
        width: 100%;
        text-align: right;
        padding-top: 10px;
        border-top: 1px solid var(--light-gray);
        margin-top: 10px;
      }
    }
  }
</style>
