<script lang="ts">
  import { SelectMulti } from "/src/lib";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack", "option1", "option2", "option3", "option4", "option5", "option6", "option7", "option8", "option9", "option10", "option11", "option12", "option13", "option14", "option15", "option16", ];
  let selectedSuvOptions = [];

  let suvOptionsObjects = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [];
</script>


# Select (multi)

---

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="Select as many as apply"
  valuesArray={suvOptions}
  arrayType="string"
  bind:selectedValues={selectedSuvOptions}
/>
