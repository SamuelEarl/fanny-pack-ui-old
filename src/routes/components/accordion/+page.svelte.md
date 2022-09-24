<script lang="ts">
  import { AccordionGroup, Accordion } from "/src/lib";
</script>


# Accordion

TODO: Finish this documentation. I need to add an `id` prop and add a "Props" description section.

---

## Example Usage

<AccordionGroup padding="md">
  <Accordion title="Accordion 1" showAccordionPanel={true} size="md">
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
