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
  import {
    MDCDataTable,
    MDCDataTableRowSelectionChangedEventDetail,
  } from "@material/data-table";
  import { onMount, onDestroy } from "svelte";
  import { SelectableList } from "@smui/common/src/hoc";
  import { setDisableCheckboxMDCIstance } from "@smui/checkbox";
  import { getDialogContext } from "@smui/dialog";

  // TODO: create table from input data, sortable table, radio single selection table.

  export let table$class = "";
  export let value: any = null;

  let selectableList: SelectableList;

  setDisableCheckboxMDCIstance(true);
  const dialogContext$ = getDialogContext();

  let dataTable: MDCDataTable;
  onMount(async () => {
    dataTable = new MDCDataTable(dom);

    dataTable.listen("MDCDataTable:rowSelectionChanged", handleChange);
    dataTable.listen("MDCDataTable:selectedAll", selectAllRows);
    dataTable.listen("MDCDataTable:unselectedAll", unselectAllRows);
  });

  // Redraw on dialog opened
  $: if (dataTable && $dialogContext$?.isOpen) dataTable.layout();

  onDestroy(() => {
    (dataTable as any).headerRowCheckbox = {destroy(){}}; // Workaround for MDCDataTable bug on destroy
    (dataTable as any).rowCheckboxList = []; // Workaround for MDCDataTable bug on destroy

    dataTable && dataTable.destroy();
  });

  function handleChange(
    event: CustomEvent<MDCDataTableRowSelectionChangedEventDetail>
  ) {
    selectableList.setItemSelected(
      event.detail.rowIndex,
      event.detail.selected
    );
  }

  function selectAllRows() {
    selectableList.selectAll();
  }

  function unselectAllRows() {
    selectableList.unselectAll();
  }
</script>

<SelectableList bind:this={selectableList} bind:value>
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
