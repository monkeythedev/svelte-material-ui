import { SortActionEventDetail } from "@material/data-table";

export type SortDirection = "ascending" | "descending" | "none";
export interface SortEventDetail
	extends Omit<SortActionEventDetail, "sortValue"> {
	sortValue: SortDirection;
}
