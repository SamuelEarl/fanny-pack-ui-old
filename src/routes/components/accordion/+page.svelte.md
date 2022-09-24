<script lang="ts">
  import { AccordionGroup, Accordion } from "/src/lib";
</script>


# Accordion

TODO: Finish this documentation. I need to add an `id` prop and add a "Props" description section.

---

## Example Usage

<AccordionGroup padding="md">
  <Accordion id="123" title="Accordion 1" showAccordionPanel={true} size="md">
    <p>This accordion panel is open by default</p>
  </Accordion>

  <Accordion title="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>

<br>

```svelte
<script>
  import { AccordionGroup, Accordion } from "@fanny-pack-ui/svelte-kit";
</script>

<AccordionGroup padding="md">
  <Accordion title="Accordion 1" showAccordionPanel={true} size="md">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>
```

<br>

An `<AccordionGroup>` component simply adds a border around a group of accordion menus to give the group a unified appearance. But you can also use the `<Accordion>` components without an `<AccordionGroup>` component:

<br>

<Accordion title="Accordion 1">
  <p>Accordion content</p>
</Accordion>

<Accordion title="Accordion 2">
  <p>Accordion content</p>
</Accordion>

<Accordion title="Accordion 3">
  <p>Accordion content</p>
</Accordion>

<br>

```svelte
<script>
  import { Accordion } from "@fanny-pack-ui/svelte-kit";
</script>

<Accordion title="Accordion 1">
  <p>Accordion content</p>
</Accordion>

<Accordion title="Accordion 2">
  <p>Accordion content</p>
</Accordion>

<Accordion title="Accordion 3">
  <p>Accordion content</p>
</Accordion>
```

<br>

## Props

### The `<AccordionGroup>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `padding`<br>*(optional)* | `string` | `sm`, `md`, `lg` | `md` | This prop will set the padding size between the `<AccordionGroup>`'s border and the `<Accordion>`s that are nested inside the `<AccordionGroup>`. |

<br>

### The `<Accordion>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `id`<br>*(optional)* | `string` | Any string | `""` (empty string) | You can give your `<Accordion>` components an `id` value that will appear on the `<Accordion>` component's button. |
| `title` | `string` | Any string | NA | This prop will provide the title text for the `<Accordion>` component's button. |
| `showAccordionPanel`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop will cause the `<Accordion>` component's panel to either be shown or hidden by default. |
| `size`<br>*(optional)* | `string` | `sm`, `md`, `lg` | `md` | Alter the padding and font size of the button. |

<br><br>

## Slots

### The `<AccordionGroup>` component
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| Default slot | NA | You can nest as many `<Accordion>` components as you want in between the opening `<AccordionGroup>` and closing `</AccordionGroup>` tags. |

<br>

### The `<Accordion>` component
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| Default slot | NA | The elements you nest in between the opening `<Accordion>` and closing `</Accordion>` tags will appear as the `<Accordion>` component's panel content. You can nest any elements you want in between the opening `<Accordion>` and closing `</Accordion>` tags. |
