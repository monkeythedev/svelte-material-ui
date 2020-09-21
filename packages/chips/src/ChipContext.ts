import { MDCChip } from '@material/chips';

export interface ChipContext {
  chip: MDCChip;
  dom: HTMLDivElement;
  selected: boolean;
  setChip(chip: MDCChip): void;
}
