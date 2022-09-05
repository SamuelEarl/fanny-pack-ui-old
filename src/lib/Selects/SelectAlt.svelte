<!--
  I converted the Custom Select Box from this How To page into a Svelte select box:
  https://www.w3schools.com/howto/howto_custom_select.asp
-->

<script lang="ts">
  import { onMount } from "svelte";
  import { createId } from "../fpui-utils";

  // export let label = "";
  export let value = "";
  let componentId = createId();

  onMount(() => {
    // TODO: Replace the `innerHTML` references with the correct variable reference to get this Svelte component to work.

    /* Get the `fpui-select-container-${componentId}` element. */
    let selectContainer = document.getElementsByClassName(`fpui-select-container-${componentId}`)[0];
    let selectElem = selectContainer.firstChild;
    
    /* Create a new <div> element that will act as the selected item. */
    let selectOptionSelected = document.createElement("DIV");
    selectOptionSelected.setAttribute("class", "fpui-select-option-selected");
    selectOptionSelected.innerHTML = selectElem.options[selectElem.selectedIndex].innerHTML;
    selectContainer.appendChild(selectOptionSelected);

    /* Create a new <div> element that will contain the list of options. */
    let selectOptionList = document.createElement("DIV");
    selectOptionList.setAttribute("class", "fpui-select-option-list fpui-select-option-list-hide");

    // For each option inside the <select> element, create a new <div> element. 
    // Each of these <div> elements will appear as an <option> element to the user because they will be styleable.
    for (let j = 1; j < selectElem.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      let selectOption = document.createElement("DIV");
      selectOption.setAttribute("class", "fpui-select-option");
      selectOption.innerHTML = selectElem.options[j].innerHTML;
      selectOption.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("fpui-same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "fpui-same-as-selected");
            break;
          }
        }
        h.click();
      });
      selectOptionList.appendChild(selectOption);
    }

    selectContainer.appendChild(selectOptionList);
    selectOptionSelected.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("fpui-select-option-list-hide");
      this.classList.toggle("select-arrow-active");
    });


    // // let selectContainerLength = selectContainer.length;
    // for (let i = 0; i < selectContainerLength; i++) {
    //   let selectEl = selectContainer[i].getElementsByTagName("select")[0];
    //   let selectElLength = selectEl.length;
    //   /* For each element, create a new DIV that will act as the selected item: */
    //   let selectOptionSelected = document.createElement("DIV");
    //   selectOptionSelected.setAttribute("class", "fpui-select-option-selected");
    //   selectOptionSelected.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;
    //   selectContainer[i].appendChild(selectOptionSelected);
    //   /* For each element, create a new DIV that will contain the option list: */
    //   let selectOptionList = document.createElement("DIV");
    //   selectOptionList.setAttribute("class", "fpui-select-option-list fpui-select-option-list-hide");
    //   for (let j = 1; j < selectElLength; j++) {
    //     /* For each option in the original select element,
    //     create a new DIV that will act as an option item: */
    //     let selectOption = document.createElement("DIV");
    //     selectOption.setAttribute("class", "fpui-select-option");
    //     selectOption.innerHTML = selectEl.options[j].innerHTML;
    //     selectOption.addEventListener("click", function(e) {
    //         /* When an item is clicked, update the original select box,
    //         and the selected item: */
    //         var y, i, k, s, h, sl, yl;
    //         s = this.parentNode.parentNode.getElementsByTagName("select")[0];
    //         sl = s.length;
    //         h = this.parentNode.previousSibling;
    //         for (i = 0; i < sl; i++) {
    //           if (s.options[i].innerHTML == this.innerHTML) {
    //             s.selectedIndex = i;
    //             h.innerHTML = this.innerHTML;
    //             y = this.parentNode.getElementsByClassName("fpui-same-as-selected");
    //             yl = y.length;
    //             for (k = 0; k < yl; k++) {
    //               y[k].removeAttribute("class");
    //             }
    //             this.setAttribute("class", "fpui-same-as-selected");
    //             break;
    //           }
    //         }
    //         h.click();
    //     });
    //     selectOptionList.appendChild(selectOption);
    //   }
    //   selectContainer[i].appendChild(selectOptionList);
    //   selectOptionSelected.addEventListener("click", function(e) {
    //     /* When the select box is clicked, close any other select boxes,
    //     and open/close the current select box: */
    //     e.stopPropagation();
    //     closeAllSelect(this);
    //     this.nextSibling.classList.toggle("fpui-select-option-list-hide");
    //     this.classList.toggle("select-arrow-active");
    //   });
    // }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("fpui-select-option-list");
      y = document.getElementsByClassName("fpui-select-option-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("fpui-select-option-list-hide");
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

    /* Point the arrow upwards when the select box is open (active): */
    &.select-arrow-active:after {
      border-color: transparent transparent #fff transparent;
      top: 7px;
    }
  }

  /* Style the options, including the selected option: */
  :global(.fpui-select-option-list div), :global(.fpui-select-option-selected) {
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

  :global(.fpui-select-option-list div:hover), :global(.fpui-fpui-same-as-selected) {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
