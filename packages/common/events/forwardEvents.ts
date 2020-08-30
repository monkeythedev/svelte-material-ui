import { createEventDispatcher } from "svelte/internal";
import { DOMEvents } from "../forwardEvents";

export function domEventsForwarder(filter?: DOMEvents) {
  const dispatch = createEventDispatcher();
  return function domEventsForward({ detail: event }: CustomEvent<Event>) {
    if (filter && !filter.includes(event.type)) return;

    dispatch(event.type, event);
    dispatch("domEvent", event);
  };
}
