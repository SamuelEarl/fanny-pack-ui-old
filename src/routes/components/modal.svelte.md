<script lang="ts">
  import { Modal } from "/src/lib";
  import { Button } from "/src/lib";

  let showModal = false;
  let savingEdits = false;

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>


# Modal (popup window)

---

Look at Semantic modals for simple design ideas.

{#if showModal}
  <Modal
    title="Modal Test"
    disabled={savingEdits}
    on:closeModal={() => showModal = !showModal}
  >
    <div slot="modalBody">
      <div>Modal body text goes here...</div>
    </div>
    <div slot="modalFooterLeft">
      <Button
        btnIcon="ion:save-sharp"
        disabled={savingEdits} 
        on:click={handleSaveData}
      >
        Save Data
        <span slot="btnTextDisabled">Saving Data...</span>
      </Button>
    </div>
  </Modal>
{/if}

<Button on:click={() => showModal = true}>Click To Show Modal</Button>

---

## Custom Modal Styles

You can customize the modal body with the `--custom-modal-body-padding` style prop.
