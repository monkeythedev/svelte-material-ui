import {classAdderBuilder} from '@smui/common/classAdderBuilder';
import Span from '@smui/common/dom/Span.svelte';

export const textClassAdder = classAdderBuilder({
  class: 'mdc-list-item__text',
  component: Span,
  contexts: {}
});