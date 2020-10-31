import { createEventDispatcher } from "svelte/internal";
import { DOMEvents } from "../forwardEvents";

export function DOMEventsForwarder(filter?: DOMEvents) {
  const dispatch = createEventDispatcher<{
    domEvent: Event;
    [event: string]: Event;
  }>();
  return function domEventsForward({ detail: event }: CustomEvent<Event>) {
    if (filter && !filter.includes(event.type)) return;

    dispatch(event.type, event);
    dispatch("domEvent", event);
  };
}
