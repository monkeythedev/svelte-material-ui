<script lang="ts">
  import classes from "./APIList.module.scss";
  import APIListItem from "./APIListItem.svelte";
</script>

<div class={classes["api-list"]}>
  <APIListItem>
    <code slot="api">on:keydown</code>
    <code slot="interface">KeyboardEvent</code>
    <p slot="description">Proxy for HTML <code>keydown</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:keypress</code>
    <code slot="interface">KeyboardEvent</code>
    <p slot="description">Proxy for HTML <code>keypress</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:keyup</code>
    <code slot="interface">MouseEvent</code>
    <p slot="description">Proxy for HTML <code>keyup</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:click</code>
    <code slot="interface">MouseEvent</code>
    <p slot="description">Proxy for HTML <code>click</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:change</code>
    <code slot="interface">Event</code>
    <p slot="description">Proxy for HTML <code>change</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:select</code>
    <code slot="interface">Event</code>
    <p slot="description">Proxy for HTML <code>select</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:focus</code>
    <code slot="interface">Event</code>
    <p slot="description">Proxy for HTML <code>focus</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:focusout</code>
    <code slot="interface">Event</code>
    <p slot="description">Proxy for HTML <code>focusout</code> event</p>
  </APIListItem>
  <APIListItem>
    <code slot="api">on:focusin</code>
    <code slot="interface">Event</code>
    <p slot="description">Proxy for HTML <code>focusin</code> event</p>
  </APIListItem>
</div>
