<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "/src/lib";
  import { Button } from "/src/lib";
</script>

# Tooltip

---

Hover over the tooltip at the end of this sentence. <Tooltip tip="{`This is how you \n\n can create a tooltip \n\n with multi-line content`}"><Icon icon="entypo:info-with-circle" /></Tooltip>

<Tooltip tip="{`This is a tooltip \n\n over a button`}">
  <Button>
    Hover over this button
  </Button>
</Tooltip>


<Tooltip tip="{`This is a tooltip \n\n over a button`}">
  <button style="padding: 10px">
    Hover over this button
  </button>
</Tooltip>
