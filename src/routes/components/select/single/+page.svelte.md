<script lang="ts">
  import { Select, CurrencyInput } from "/src/lib";

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = "July";

  let monthObjects = [
    { shortMonth: "Jan", longMonth: "January" },
    { shortMonth: "Feb", longMonth: "February" },
    { shortMonth: "Mar", longMonth: "March" },
    { shortMonth: "Apr", longMonth: "April" },
    { shortMonth: "May", longMonth: "May" },
    { shortMonth: "Jun", longMonth: "June" },
    { shortMonth: "Jul", longMonth: "July" },
    { shortMonth: "Aug", longMonth: "August" },
    { shortMonth: "Sep", longMonth: "September" },
    { shortMonth: "Oct", longMonth: "October" },
    { shortMonth: "Nov", longMonth: "November" },
    { shortMonth: "Dec", longMonth: "December" },
  ];
  let selectedMonthObject = monthObjects[6];

  let dinosaurObjects = [
    { name: "Tyrannosaurus", group: "Theropods" },
    { name: "Velociraptor", group: "Theropods" },
    { name: "Diplodocus", group: "Sauropods" },
    { name: "Saltasaurus", group: "Sauropods" },
    { name: "Deinonychus", group: "Theropods" },
    { name: "Apatosaurus", group: "Sauropods" },
  ];
  let selectedDinosaurObject = dinosaurObjects.find(obj => obj.name === "Diplodocus");

  function handleChange() {
    console.log("Changed");
  }

  let value = 0;

  const jobOptions = [
    "UI/UX Designer",
    "Frontend Engineer",
    "Backend Engineer",
    "QA Engineer",
    "Unicorn",
	];
  let selectedJobOption = jobOptions[0];
</script>


# Select (single)

---

## Example Usage

<Select 
  label="Main Job Role"
  options={jobOptions}
  bind:value={selectedJobOption}
/>

<!-- <div style="margin-bottom:20px">
  <Select
    label="Select an option"
    options={months}  
    bind:value={selectedMonth}
    id="id-for-select-box"
    on:change={handleChange}
    disabled={false}
    padding="sm"
    fontSize="md"
  />
</div> -->

<!-- Value of `selectedMonth`: <code>{selectedMonth}</code> -->

<br>
