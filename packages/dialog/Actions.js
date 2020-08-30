import {classAdderBuilder} from '@smui/common/classAdderBuilder';
import Footer from '@smui/common/Footer.svelte';

export default classAdderBuilder({
  class: 'mdc-dialog__actions',
  component: Footer,
  contexts: {
    'SMUI:button:context': 'dialog:action'
  }
});
