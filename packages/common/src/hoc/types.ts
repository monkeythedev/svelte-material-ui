export interface OnSelectableChange {
  value: any,
  selected: boolean
}

export interface OnSelectableListChange {
  value: any,
  selectedItemsIndex: number[]
}

export type SelectionType = "single" | "multi";