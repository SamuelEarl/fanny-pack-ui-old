<script lang="ts">
  import { Button, Checkbox, Modal } from "/src/lib";

  let showModal = false;
  let showModalBody = false;
  let savingEdits = false;
  let enableScrollingBody = false;

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>


# Modal (popup window)

---

<Button btnIcon="" on:click={() => showModal = true}>Click To Show Modal</Button>
<br><br>
<Checkbox bind:checked={enableScrollingBody} label="Enable `scrollingBody` prop" />

{#if showModal}
  <Modal
    title="Modal Title"
    scrollingBody={enableScrollingBody}
    disabled={savingEdits}
    on:closeModal={() => showModal = false}
  >
    <div slot="modalBody">
      <div>Modal body text goes here...</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
  import { Button, Checkbox, Modal } from "@fanny-pack-ui/svelte-kit";

  let showModal = false;
  let savingEdits = false;
  let enableScrollingBody = false;

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>

<Button btnIcon="" on:click={() => showModal = true}>Click To Show Modal</Button>
<br><br>
<Checkbox bind:checked={enableScrollingBody} label="Enable `scrollingBody` prop" />

{#if showModal}
  <Modal
    title="Modal Title"
    scrollingBody={enableScrollingBody}
    disabled={savingEdits}
    on:closeModal={() => showModal = false}
  >
    <div slot="modalBody">
      <div>Modal body text goes here...</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
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

*NOTE: The footer is intended to contain buttons. You can include as many footer buttons as you want as long as they fit the footer space without spilling over.*

---

## Exclude Modal Header or Footer
You can exclude the modal header by leaving out the `title` prop.

You can exclude the modal footer by leaving out the `modalFooterLeft` and `modalFooterRight` slots.

<Button btnIcon="" on:click={() => showModalBody = true}>Click To Show Modal Without Header or Footer</Button>

{#if showModalBody}
  <!-- No `title` prop -->
  <Modal
    disabled={savingEdits}
    on:closeModal={() => showModalBody = false}
  >
    <div slot="modalBody">
      <div>This modal only has a body (i.e. there is no header or footer included).</div>
      <h3>I can put header tags inside this modal</h3>
      <p id="custom-p">I can put any custom styled content inside this modal</p>
    </div>
    <!-- No modalFooterLeft or modalFooterRight slots -->
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
  <!-- No `title` prop -->
  <Modal
    disabled={savingEdits}
    on:closeModal={() => showModalBody = false}
  >
    <div slot="modalBody">
      <div>This modal only has a body (i.e. there is no header or footer included).</div>
      <h3>I can put header tags inside this modal</h3>
      <p id="custom-p">I can put any custom styled content inside this modal</p>
    </div>
    <!-- No `modalFooterLeft` or `modalFooterRight` slots -->
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

You can customize the following style props:

* `--custom-modal-width-lg-up`: On screens that are 1024px wide and wider, the `<Modal>` component will be 950px wide. You can change that width with this custom style prop.
* `--custom-modal-header-padding`: The default header padding is 20px. You can change that with this custom style prop.
* `--custom-modal-footer-padding`: The default footer padding is 10px (top and bottom) and 20px (left and right). You can change that with this custom style prop.
* `--custom-modal-body-padding`: The default body padding is 20px. You can change that with this custom style prop. For example, if you want to have a modal that displays an image, chart, or login form that extends all the way to the edges of the modal, then you can exclude the header and footer (see above) and remove the body padding by setting this style prop to `0`.


```svelte
<Modal
  title="Modal Title"
  --custom-modal-width-lg-up="950px"
  --custom-modal-header-padding="20px"
  --custom-modal-footer-padding="10px 20px"
  --custom-modal-body-padding="0"
>
  <div slot="modalBody">
    <img src="path/to/image" alt="image-alt-tag" />
  </div>
  <div slot="modalFooterLeft">
    <Button>Left Button</Button>
  </div>
  <div slot="modalFooterRight">
    <Button>Right Button</Button>
  </div>
</Modal>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `title` | `string` | Any string | `""` (an empty string) | This prop will set the title of the modal.
| `scrollingBody` | `boolean` | `true`, `false` | `false` | If this prop is set to `true`, then the modal will fill the height of the screen. Also, if the content inside the modal body overflows the available space, then a scrollbar will appear and the modal body content will scroll.
| `disabled` | `boolean` | `true`, `false` | `false` | When this prop is set to `true` it will disable the close button above the modal so a user could not close the modal until after the close button is no longer disabled. The close button might need to be disable for scenarios where a user clicks a button that will save edits to a database and you don't want users to be able to close the modal until after the edits have been saved to a database. |

<br><br>

## Slots
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| `modalBody` | NA | The content that is passed to this slot will be displayed in the modal body. You can pass any custom content to this slot. See the example under the "Exclude Modal Header or Footer" heading. |
| `modalFooterLeft` | NA | The content that is passed to this slot will be displayed in the left side of the modal footer. |
| `modalFooterRight` | NA | The content that is passed to this slot will be displayed in the right side of the modal footer. |

*NOTE: The footer is intended to contain buttons. You can include as many footer buttons as you want as long as they fit the footer space without spilling over.*

<br><br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:closeModal` | The `<Modal>` component forwards this custom event, which can be used to hide the modal when a user clicks the modal's close button. |
