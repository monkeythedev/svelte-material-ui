<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/actions/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = "";
  export { className as class };
  export let style: string = "";
  export let id: string = "";

  export let dom: HTMLDivElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  // DataTable
  import { MDCDataTable } from "@material/data-table";
  import { onMount, onDestroy, getContext, setContext } from "svelte";
  import { createDataTableContext } from "./DataTableContext";
  import { SelectableList } from "@smui/common/src/hoc";

  //const forwardEvents = forwardEventsBuilder(get_current_component(), ['MDCDataTable:rowSelectionChanged', 'MDCDataTable:selectedAll', 'MDCDataTable:unselectedAll']);

  export let table$class = "";

  let selectableList: SelectableList;

  let changeHandlers = [];
  let checkBoxHeaderPromiseResolve;
  let checkBoxHeaderPromise = new Promise(
    (resolve) => (checkBoxHeaderPromiseResolve = resolve)
  );
  let checkBoxListPromiseResolve;
  let checkBoxListPromise = new Promise(
    (resolve) => (checkBoxListPromiseResolve = resolve)
  );
  //let addLayoutListener = getContext('SMUI:addLayoutListener');
  let removeLayoutListener;

  // setContext('SMUI:generic:input:addChangeHandler', addChangeHandler);
  // setContext('SMUI:checkbox:context', 'data-table');
  // setContext('SMUI:checkbox:instantiate', false);
  // setContext('SMUI:checkbox:getInstance', getCheckboxInstancePromise);

  let dataTable: MDCDataTable;
  onMount(async () => {
    dataTable = new MDCDataTable(dom);

    dataTable.listen("MDCDataTable:rowSelectionChanged", handleChange);
    dataTable.listen("on:MDCDataTable:selectedAll", selectAllRows);
    dataTable.listen("MDCDataTable:unselectedAll", unselectAllRows);
  });

  onDestroy(() => {
    dataTable && dataTable.destroy();
  });

  function handleChange(
    e: CustomEvent<MDCDataTableRowSelectionChangedEventDetail>
  ) {
    selectableList.setValue();
  }

  function selectAllRows() {}

  function unselectAllRows() {}
</script>

<SelectableList bind:this={selectableList} bind:value on:change={handleChange}>
  <div
    bind:this={dom}
    {...props}
    class="mdc-data-table {className}"
    {style}
    {id}
    use:forwardDOMEvents>
    <table class="mdc-data-table__table {table$class}">
      <slot />
    </table>
  </div>
</SelectableList>

<!-- <div
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class="mdc-data-table {className}"
  on:MDCDataTable:rowSelectionChanged={handleChange}
  on:MDCDataTable:selectedAll={handleChange}
  on:MDCDataTable:unselectedAll={handleChange}
  {...exclude($$props, ['use', 'class', 'table$'])}
>
  <table
    use:useActions={table$use}
    class="mdc-data-table__table {table$class}"
    {...prefixFilter($$props, 'table$')}
  >
    <slot></slot>
  </table>
</div> -->
