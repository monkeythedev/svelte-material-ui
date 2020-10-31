// @ts-ignore
import ClassAdder, {internals} from './ClassAdder.svelte';

export function classAdderBuilder(props) {
  function Component(...args) {
    Object.assign(internals, props);
    // @ts-ignore
    return new ClassAdder(...args);
  }

  Component.prototype = ClassAdder;

  // SSR support
  // @ts-ignore
  if (ClassAdder.$$render) {
    // @ts-ignore
    Component.$$render = (...args) => Object.assign(internals, props) && ClassAdder.$$render(...args);
  }
  // @ts-ignore
  if (ClassAdder.render) {
    // @ts-ignore
    Component.render = (...args) => Object.assign(internals, props) && ClassAdder.render(...args);
  }

  return Component;
}