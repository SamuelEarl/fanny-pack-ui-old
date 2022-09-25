<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";
  
  let tabStyle = "line";
</script>


# Tabs (tabbed content)

This tabs component is borrowed from this great component in the Svelte REPL: [Tabs](https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0).

I have simply restyled that component to match the rest of the Fanny Pack UI components.

---

## Example Usage

<br>

<TabsContainer border={true} padding="md">
  <TabBar>
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <p class="h2">First Panel</p>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <p class="h2">Second Panel</p>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <p class="h2">Third Panel</p>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script>
  import { TabsContainer, TabBar, Tab, TabPanel } from "@fanny-pack-ui/svelte-kit";  
</script>

<TabsContainer border={true} padding="md">
  <TabBar>
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

There are two different tab styles: `fill` and `line`. The default style is `fill`. The next example shows how to set the tab style to `line` with the `tabStyle` prop.

*NOTE: The default tab style can be changed in your `/src/theme.ts` file. See the heading [Configure JavaScript variables](/get-started#configure-js-vars) on the Get Started page for instructions on how to set the default value.*

<br>

<TabsContainer border={true} padding="md">
  <TabBar {tabStyle}>
    <Tab {tabStyle}>First Tab</Tab>
    <Tab {tabStyle}>Second Tab</Tab>
    <Tab {tabStyle}>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <p class="h2">First Panel</p>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <p class="h2">Second Panel</p>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <p class="h2">Third Panel</p>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";
  
  let tabStyle = "line";
</script>

<TabsContainer border={true} padding="md">
  <TabBar {tabStyle}>
    <Tab {tabStyle}>First Tab</Tab>
    <Tab {tabStyle}>Second Tab</Tab>
    <Tab {tabStyle}>Third Tab</Tab>
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

## Props

### For the `<TabsContainer>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `border` | `boolean` | `true`, `false` | `false` | This prop will add a border around the tab bar and the tab panels. 
| `padding` | `string` | `sm`, `md`, `lg` | `md` | If `border` is true, then the value that is passed to this prop will be applied as the padding between the border and the tab contents. |

*NOTE: You can also wrap your tab components in a `<div>` and apply your own border and padding values. The above props are just for convenience.*

<br>

### For the `<TabBar>` and `<Tab>` components
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `tabStyle` | `string` | `fill`, `line` | `fill`<br>The default value can be set in the `/src/theme.ts` file. | You can use the default tab style for most of your tabs and you can use this prop if you want to set the tab style for individual tabs.<br><br>See the heading [Configure JavaScript variables](/get-started#configure-js-vars) on the Get Started page for instructions on how to set the default value. |


<style>
  .h2 {
    font-size: 2rem;
  }
</style>
