export function listenEvents<E extends Event = Event>(
  node: Node,
  opts: ListenerOpt<E>[]
) {
  let destructors = addListeners(node, opts);

  return {
    update(opts: ListenerOpt<E>[]) {
      removeListener(node, destructors);
      destructors = addListeners(node, opts);
    },
    destroy() {
      removeListener(node, destructors);
    },
  };
}

function addListeners<E extends Event>(
  node: Node,
  opts: ListenerOpt<E>[]
): ListenerDestructor<E>[] {
  return opts.map(({eventName, listener}) => {
    function eventListener(event: E) {
      listener(event);
    }

    node.addEventListener(eventName, eventListener);

    return [eventName, eventListener];
  });
}

function removeListener<E extends Event>(
  node: Node,
  destructors: ListenerDestructor<E>[]
) {
  destructors.forEach(([eventName, listener]) => {
    node.removeEventListener(eventName, listener);
  });
}

export interface ListenerOpt<E extends Event = CustomEvent> {
  eventName: string,
  listener: (event: E) => void
}

type ListenerDestructor<E extends Event> = [
  eventName: string,
  listener: (event: E) => void
];
