<script lang="ts">
  //#region Base
  import { DOMEventsForwarder } from "@smui/common/events/DOMEventsForwarder";
  const forwardDOMEvents = DOMEventsForwarder();
  let className = undefined;
  export { className as class };
  export let style: string = undefined;
  export let id: string = undefined;

  import { ListItemDOMElement } from "@smui/list";
  export let dom: ListItemDOMElement = null;

  import { BaseProps } from "@smui/common/dom/Props";
  export let props: BaseProps = {};
  //#endregion

  import { getContext, setContext } from "svelte";
  import { Item } from "@smui/list";

  export let value = "";
  export let selected = undefined;

  let enhanced = getContext("SMUI:select:option:enhanced");

  setContext("SMUI:list:item:role", "option");
</script>

<Item
  bind:dom
  {...props}
  {id}
  class={className}
  {style}
  data-value={value}
  {selected}
  on:domEvent={forwardDOMEvents}>
  <slot />
</Item>

<!-- {#if enhanced}
  <Item
    use={[forwardEvents, ...use]}
    data-value={value}
    {selected}
    {...props}
  ><slot></slot></Item>
{:else}
  <option
    use:useActions={use}
    use:forwardEvents
    {value}
    {...selectedProp}
    {...props}
  ><slot></slot></option>
{/if} -->
