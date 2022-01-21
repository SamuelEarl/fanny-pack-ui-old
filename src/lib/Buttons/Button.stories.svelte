<Meta
  title="SCL/Buttons"
  component={Button}
  argTypes={{
    color: { control: "color" },
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
    },
    outline: { control: "boolean" },
    onClick: { action: "onClick" },
  }}
/>


<Template let:args>
  <Button {...args} on:click={args.onClick}></Button>
</Template>


<Story name="Default">
  <Button color="primary" size="md">Button Text</Button>
</Story>

<Story name="Secondary">
  <Button color="secondary" size="md">Button Text</Button>
</Story>

<!-- <Story
  name="Secondary"
  args={{
    label: "Button",
  }}
/>

<Story
  name="Large"
  args={{
    size: "large",
    label: "Button",
  }}
/>

<Story
  name="Small"
  args={{
    size: "small",
    label: "Button",
  }}
/> -->


<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "./Button.svelte";
</script>
