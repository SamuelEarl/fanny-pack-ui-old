<script lang="ts">
  import { AccordionGroup, Accordion, TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";
</script>


# Accordion

---

## Example Usage

<AccordionGroup border={true} borderPadding="md" accordionPadding="sm" fontSize="md" SpaceBetweenAccordions="sm">
  <Accordion id="123" title="Accordion 1" open={true}>
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

<AccordionGroup border={true} borderPadding="md" accordionPadding="sm" fontSize="md" SpaceBetweenAccordions="sm">
  <Accordion id="123" title="Accordion 1" open={true}>
    <p>This accordion panel is open by default</p>
  </Accordion>

  <Accordion title="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>
```

<hr>

Setting `border={true}` on the `<AccordionGroup>` adds a border around a group of accordion menus to give the group a unified appearance. But you can also use the `<Accordion>` components without a border:

<br>

<AccordionGroup border={false} borderPadding="xl" accordionPadding="sm" fontSize="md" SpaceBetweenAccordions="sm">
  <Accordion title="Accordion 1">
    <p>Accordion content</p>
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
  import { Accordion } from "@fanny-pack-ui/svelte-kit";
</script>

<AccordionGroup border={false} borderPadding="xl" accordionPadding="sm" fontSize="md" SpaceBetweenAccordions="sm">
  <Accordion title="Accordion 1">
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

Note that you can set the `borderPadding` prop to an empty string to have the accordions stretch to the edges of their parent element.

<br>

## Props

<TabsContainer>
  <TabBar>
    <Tab>AccordionGroup</Tab>
    <Tab>Accordion</Tab>
  </TabBar>

  <TabPanel>
    <h2>AccordionGroup</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `border`<br>*(optional)* | `boolean` | `true`, `false` | `true` | Add a border around a group of accordion menus to give the group a unified appearance. |
    | `borderPadding`<br>*(optional)* | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `sm` (`10px`) | The value that is passed to this prop will be applied as the padding between the border and the accordions. You can pass an empty string (`""`) to remove the padding around the accordions. |
    | `accordionPadding`<br>*(optional)* | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `sm` (`10px`) | Alter the padding of the accordion buttons. |
    | `fontSize`<br>*(optional)* | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` (`text-base`) | Alter the font size of the accordion panels. |
    | `SpaceBetweenAccordions`<br>*(optional)* | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `xs` (`5px`)  | The value that is passed to this prop will be applied as the margin below each of the accordion buttons. You can pass an empty string (`""`) to remove the space between each of the accordions. |
  </TabPanel>

  <TabPanel>
    <h2>Accordion</h2>
    
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `title` | `string` | Any string | NA | This prop will provide the title text for the `<Accordion>` component's button. |
    | `open`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop will cause the `<Accordion>` component's panel to either be open or closed by default. |
    | `id`<br>*(optional)* | `string` | Any string | `""` (empty string) | You can give your `<Accordion>` components an `id` value that will appear on the `<Accordion>` component's button. |
  </TabPanel>
</TabsContainer>

<br><br>

## Slots

<TabsContainer>
  <TabBar>
    <Tab>AccordionGroup</Tab>
    <Tab>Accordion</Tab>
  </TabBar>

  <TabPanel>
    <h2>AccordionGroup</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <div></div>

    | Slot name | Default value | Description |
    | --------- | ------------- | ----------- |
    | Default slot | NA | You can nest as many `<Accordion>` components as you want in between the opening `<AccordionGroup>` and closing `</AccordionGroup>` tags. |
  </TabPanel>

  <TabPanel>
    <h2>Accordion</h2>
    
    <div></div>

    | Slot name | Default value | Description |
    | --------- | ------------- | ----------- |
    | Default slot | NA | The elements you nest in between the opening `<Accordion>` and closing `</Accordion>` tags will appear as the `<Accordion>` component's panel content. You can nest any elements you want in between the opening `<Accordion>` and closing `</Accordion>` tags. |
  </TabPanel>
</TabsContainer>
