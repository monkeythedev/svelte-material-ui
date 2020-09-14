export function initialFocus(node: HTMLElement, props: {target: HTMLElement}) {
  const target = props.target || node;

  target.setAttribute('data-mdc-dialog-initial-focus', '');

  return {
    destroy() {
      target.removeAttribute('data-mdc-dialog-initial-focus');
    }
  }
}