export default function Anchor(node: HTMLElement) {
  node.classList.add('mdc-menu-surface--anchor');

  return {
    destroy() {
      node.classList.remove('mdc-menu-surface--anchor');
    }
  }
}