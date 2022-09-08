<script lang="ts">
  import { TabBar, Tab } from "/src/lib";

  let activeTab = "First Tab";
</script>

# Tabs (tabbed content)

---

# TODO: Look up ways to do this. Here is one idea: https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0

## Example Usage

<TabBar let:prop={activeTab}>
  <Tab title="First Tab" on:setActiveTab={(event) => activeTab = event.detail} />
  <Tab title="Second Tab" {activeTab} />
  <Tab title="Third Tab" {activeTab} />
</TabBar>
