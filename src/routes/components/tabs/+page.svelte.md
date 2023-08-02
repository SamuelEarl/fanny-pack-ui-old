<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";
</script>


# Tabs (tabbed content)

This tabs component is borrowed from this great component in the Svelte REPL: [Tabs](https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0).

I have simply restyled that component to match the rest of the Fanny Pack UI components.

---

## Example Usage

<br>

<TabsContainer border={true} containerPadding="md" tabPadding="sm" panelPadding="" tabFontSize="sm">
  <TabBar tabStyle="line" marginBottom="md">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "@fanny-pack-ui/svelte-kit";  
</script>

<TabsContainer border={true} containerPadding="md" tabPadding="sm" panelPadding="" tabFontSize="sm">
  <TabBar tabStyle="line" marginBottom="md">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>
```

<br>

The order of the `<Tab>` and `<TabPanel>` components matters. The first `<Tab>` is associated with the first `<TabPanel>`, the second `<Tab>` is associated with the second `<TabPanel>`, and so on.

There are two different tab styles: `line` and `fill`. The default style is `line`.

*NOTE: The default tab style can be changed in your `/src/fp-env-vars/.env` file. See the heading [Configure JavaScript variables](/get-started#configure-default-component-settings) on the Get Started page for instructions on how to set the default value.*

<br>

This is how a `line` tab style looks without a border:

<br>

<TabsContainer border={false} containerPadding="xl">
  <TabBar tabStyle="line" marginBottom="md">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<TabsContainer border={false} containerPadding="xl">
  ...
</TabsContainer>
```

<br>

The next example shows how to set the tab style to `fill` with the `tabStyle` prop.

<br>

<TabsContainer border={true} containerPadding="md">
  <TabBar tabStyle="fill" marginBottom="md">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "@fanny-pack-ui/svelte-kit";
</script>

<TabsContainer border={true} containerPadding="md">
  <TabBar tabStyle="fill" marginBottom="md">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>
```

<br>

This is how a `fill` tab style looks without a border:

<br>

<TabsContainer border={false} containerPadding="xl">
  <TabBar tabStyle="fill" marginBottom="md">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<TabsContainer border={false} containerPadding="xl">
  <TabBar tabStyle="fill" marginBottom="md">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>
  ...
</TabsContainer>
```

<br><br>

## Props

<TabsContainer>
  <TabBar>
    <Tab>TabsContainer</Tab>
    <Tab>TabBar</Tab>
  </TabBar>

  <TabPanel>
    <h2>TabsContainer</h2>

    <!-- I don't why, but inserting an element above the markdown table causes the markdown to convert to an HTML table. So, if I remove the following empty <div>, then the markdown table will display as a string of characters instead of a table. Hmmm. -->
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `border` | `boolean` | `true`, `false` | `true` | This prop will add a border around the tab bar and the tab panels. The default value can be set in the `/src/fp-env-vars/.env` file.
    | `containerPadding` | `string` | `""`, `xs`, `sm`, `md`, `lg`, `xl` | `lg` | The value that is passed to this prop will be applied as the padding between the border and the tab contents. An empty string will remove the padding. The default value can be set in the `/src/fp-env-vars/.env` file. |
    | `tabPadding` | `string` | `""`, `xs`, `sm`, `md`, `lg`, `xl` | `md` | The value that is passed to this prop will be applied as the padding for each tab. An empty string will remove the padding. The default value can be set in the `/src/fp-env-vars/.env` file. |
    | `tabFontSize` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | The value that is passed to this prop will set the font size for the tabs. The default value can be set in the `/src/fp-env-vars/.env` file.<br><br>NOTES: (1) Passing an empty string to this will just set the tab font size to your app's base font size. (2) This will not change the font size inside the panels because you can change the font yourself depending on the elements that you pass in between the `<TabPanel>` and `</TabPanel>` components. |
    | `panelPadding` | `string` | `""`, `xs`, `sm`, `md`, `lg`, `xl` | `""` (no padding) | The value that is passed to this prop will be applied as the padding for each panel. An empty string will remove the padding. The default value can be set in the `/src/fp-env-vars/.env` file. |

    ---

    *NOTE: You can also wrap your tab components in a `<div>` and apply your own border and padding values. The above props are just for convenience.*
  </TabPanel>

  <TabPanel>
    <h2>TabBar</h2>
    
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `tabStyle` | `string` | `fill`, `line` | `fill` | This prop sets the style of the tab bar and the tabs. The default value can be set in the `/src/fp-env-vars/.env` file.<br><br>See the heading [Configure JavaScript variables](/get-started#configure-default-component-settings) on the Get Started page for instructions on how to set the default value. |
    | `marginBottom` | `string` | `""`, `xs`, `sm`, `md`, `lg`, `xl` | `md`	| This prop allows you to set a margin below the `<TabBar>` to give some space between the `<TabBar>` and the `<TabPanel>`s. You can pass an empty string (`""`) to remove the margin. The default value can be set in the `/src/fp-env-vars/.env` file. |
  </TabPanel>
</TabsContainer>
