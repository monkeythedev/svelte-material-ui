import { filterStringList, StringListToFilter } from "./filterStringList";

export function parseClassList(toParse: ClassListToParse): string {
	let parsed: string;

	const parsedArray = filterStringList(toParse);

	if (parsedArray) {
		parsed = parsedArray.join(" ");
	} else {
		parsed = undefined;
	}

	return parsed;
}

type ClassListToParse = StringListToFilter;
