<!--
  I converted the Custom Select Box from this How To page into a Svelte select box:
  https://www.w3schools.com/howto/howto_custom_select.asp
-->

<script lang="ts">
  import { onMount } from "svelte";
  import { createId } from "../fpui-utils";

  // export let label = "";
  export let value;
  export let options;
  let componentId = createId();

  onMount(() => {
    // TODOS:
    // * The `options` prop is the data structure that is used to create the <options> for the <select> element. Figure out how to use the `options` prop to set the value prop and make this component work.
    // * Replace the `innerHTML` references with the correct variable reference to get this Svelte component to work.
    // * Remove event listeners in the onDestroy() hook.

    /* Get the `fpui-select-container-${componentId}` element. */
    let selectContainer = document.getElementsByClassName(`fpui-select-container-${componentId}`)[0];
    let selectElem = selectContainer.firstChild;
    
    /* Create a new <div> element that will act as the <select> element's selected option. */
    let selectOptionSelected = document.createElement("DIV");
    selectOptionSelected.setAttribute("class", "fpui-select-option-selected");
    selectContainer.appendChild(selectOptionSelected);

    /* Create a new <div> element that will act as the overlay for the <select> element's selected option. */
    let selectOptionSelectedOverlay = document.createElement("DIV");
    selectOptionSelectedOverlay.setAttribute("class", "fpui-select-option-selected-overlay");
    selectOptionSelectedOverlay.innerHTML = selectElem.options[selectElem.selectedIndex].innerHTML;
    selectOptionSelected.appendChild(selectOptionSelectedOverlay);

    /* Create a new <div> element that will contain the list of options. */
    let selectOptionList = document.createElement("DIV");
    selectOptionList.setAttribute("class", "fpui-select-option-list fpui-select-option-list-hide");

    // For each option inside the original <select> element, create a new <div> element that will go inside the `fpui-select-option-list` element.
    // Each of these new <div> elements will appear as an <option> element to the user because they will be styleable.
    for (let j = 0; j < selectElem.length; j++) {
      // For each option in the original select element, create a new DIV that will act as an option item.
      let selectOption = document.createElement("DIV");
      selectOption.setAttribute("class", "fpui-select-option");
      selectOption.innerHTML = selectElem.options[j].innerHTML;
      selectOption.addEventListener("click", function(e) {
        // When a <div class="fpui-select-option"> element is clicked, update the original select box and the <div class="fpui-select-option-selected"> element.
        for (let i = 0; i < selectElem.length; i++) {
          // `this` equals the <div class="fpui-select-option"> element.
          if (selectElem.options[i].innerHTML === this.innerHTML) {
            selectElem.selectedIndex = i;
            selectOptionSelectedOverlay.innerHTML = this.innerHTML;
            // Set the `value` prop to equal the option that was selected.
            value = options[i];
            // let sameAsSelected = this.parentNode.getElementsByClassName("fpui-same-as-selected");
            // console.log("sameAsSelected:", sameAsSelected);
            // // Remove the `.fpui-same-as-selected` class from all the `.fpui-select-option` elements.
            // for (let k = 0; k < sameAsSelected.length; k++) {
            //   sameAsSelected[k].removeAttribute("class");
            // }
            // this.setAttribute("class", "fpui-same-as-selected");
            break;
          }
        }
        selectOptionSelectedOverlay.click();
      });
      selectOptionList.appendChild(selectOption);
    }

    selectContainer.appendChild(selectOptionList);
    selectOptionSelectedOverlay.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      // closeAllSelect(this);
      // this.nextSibling.classList.toggle("fpui-select-option-list-hide");
      selectOptionList.classList.toggle("fpui-select-option-list-hide");
      // this.firstElementChild.classList.toggle("fpui-select-active");
      this.classList.toggle("fpui-select-active");      
    });

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document, except the current select box. */
// TODO: I might want to use the pattern from above in this function, where I included the componentId in the class name and then I was able to get the first element [0] from the resulting class list: 
// let selectContainer = document.getElementsByClassName(`fpui-select-container-${componentId}`)[0];
// This might simplify the logic and I wouldn't have to use for loops.
      let arrNo = [];
      let selectOptionSelectedOverlay = document.getElementsByClassName("fpui-select-option-selected-overlay");
      let selectOptionList = document.getElementsByClassName("fpui-select-option-list");
      
      for (let i = 0; i < selectOptionSelectedOverlay.length; i++) {
        if (elmnt == selectOptionSelectedOverlay[i]) {
          arrNo.push(i);
        } 
        else {
          selectOptionSelectedOverlay[i].classList.remove("fpui-select-active");
        }
      }
      
      for (let i = 0; i < selectOptionList.length; i++) {
        if (arrNo.indexOf(i)) {
          selectOptionList[i].classList.add("fpui-select-option-list-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  });
</script>


<div class={`fpui-select-container fpui-select-container-${componentId}`}>
  <select bind:value={value} on:change>
    <slot></slot>
  </select>
</div>


<style>
  /* The container must be positioned relative: */
  .fpui-select-container {
    width: 100%;
    position: relative;

    /*hide original SELECT element: */
    & select {
      display: none;
    }
  }

  :global(.fpui-select-option-selected) {
    background-color: DodgerBlue;

    /* Style the arrow inside the select element: */
    &:after {
      position: absolute;
      content: "";
      top: 14px;
      right: 10px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-color: #fff transparent transparent transparent;
    }
  }

  /* Set  */
  :global(.fpui-select-option-selected-overlay) {
    height: 100%;
    
    &:global(.fpui-select-active) {
      background-color: rgba(0, 0, 0, 0.1);
    }
  
    /* Point the arrow upwards when the select box is open (active): */
    /* &:after {
      border-color: transparent transparent #fff transparent;
      top: 7px;
    } */
  }

  :global(.fpui-select-active) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* Style the options, including the selected option: */
  :global(.fpui-select-option), :global(.fpui-select-option-selected-overlay) {
    color: #ffffff;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
  }

  /* Style options: */
  :global(.fpui-select-option-list) {
    position: absolute;
    background-color: DodgerBlue;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
  }

  /* Hide the items when the select box is closed: */
  :global(.fpui-select-option-list-hide) {
    display: none;
  }

  :global(.fpui-select-option:hover) {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
