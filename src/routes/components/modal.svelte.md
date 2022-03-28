<script lang="ts">
  import { Modal } from "/src/lib";
  import { Button } from "/src/lib";

  let showModal = false;
  let showModalBody = false;
  let savingEdits = false;

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>


# Modal (popup window)

---

<Button btnIcon="" on:click={() => showModal = true}>Click To Show Modal</Button>

{#if showModal}
  <Modal
    title="Modal Title"
    disabled={savingEdits}
    on:closeModal={() => showModal = false}
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
    <div slot="modalFooterRight">
      <Button>Another Footer Button</Button>
      <Button btnIcon="la:times" disabled={savingEdits} on:click={() => showModal = false}>Close</Button>
    </div>
  </Modal>
{/if}

```svelte
<script>
  import { Button, Modal } from "@fanny-pack-ui/svelte-kit";

  let showModal = false;
  let savingEdits = false;

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>

<Button btnIcon="" on:click={() => showModal = true}>Click To Show Modal</Button>

{#if showModal}
  <Modal
    title="Modal Title"
    disabled={savingEdits}
    on:closeModal={() => showModal = false}
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
    <div slot="modalFooterRight">
      <Button>Another Footer Button</Button>
      <Button btnIcon="la:times" disabled={savingEdits} on:click={() => showModal = false}>Close</Button>
    </div>
  </Modal>
{/if}
```

NOTE: The footer is intended to contain buttons. You can include as many footer buttons as you want as long as they fit the footer space without spilling over.

---

## Exclude Modal Header or Footer
You can exclude the modal header by leaving out the `title` prop.

You can exclude the modal footer by leaving out the `modalFooterLeft` and `modalFooterRight` slots.

<Button btnIcon="" on:click={() => showModalBody = true}>Click To Show Modal Without Header or Footer</Button>

{#if showModalBody}
  <Modal
    disabled={savingEdits}
    on:closeModal={() => showModalBody = false}
  >
    <div slot="modalBody">
      <div>This modal only has a body (i.e. there is no header or footer included).</div>
      <h3>I can put header tags inside this modal</h3>
      <p id="custom-p">I can put any custom styled content inside this modal</p>
    </div>
  </Modal>
{/if}

<style>
  #custom-p {
    font-size: 2rem;
    line-height: 2rem;
  }
</style>

```svelte
<script>
  import { Button, Modal } from "@fanny-pack-ui/svelte-kit";

  let showModalBody = false;
</script>

<Button btnIcon="" on:click={() => showModalBody = true}>Click To Show Modal Without Header or Footer</Button>

{#if showModalBody}
  <Modal
    disabled={savingEdits}
    on:closeModal={() => showModalBody = false}
  >
    <div slot="modalBody">
      <div>This modal only has a body (i.e. there is no header or footer included).</div>
      <h3>I can put header tags inside this modal</h3>
      <p id="custom-p">I can put any custom styled content inside this modal woo wee</p>
    </div>
  </Modal>
{/if}

<style>
  #custom-p {
    font-size: 2rem;
    line-height: 2rem;
  }
</style>
```

---

## Custom Modal Styles

You can customize the following styles:

* `--custom-modal-width`
* `--custom-modal-body-padding`

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `disabled` | `boolean` | `true`, `false` | `false` | When this prop is set to `true` it will disable the close button above the modal so a user could not close the modal until after the close button is no longer disabled. The close button might need to be disable for scenarios where a user clicks a button that will save edits to a database and you don't want users to be able to close the modal until after the edits have been saved to a database. |

<br><br>

## Slots
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |

<br><br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:closeModal` | This component forwards this custom event, which can be used to hide the modal when a user clicks the close button of the modal. |
