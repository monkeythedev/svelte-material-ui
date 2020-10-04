export interface SnackbarContext {
  readonly open: () => void;
  readonly close: () => void;
  readonly isOpen: boolean;
}
