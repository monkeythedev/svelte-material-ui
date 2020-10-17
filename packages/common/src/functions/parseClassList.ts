export function parseClassList(toParse: ClassListToParse): string {
  let parsed: string;

  const parsedArray = toParse
    .map((item) => {
      if (Array.isArray(item))
        return item[0] ? item[1] : item[0] === undefined ? undefined : "";
      else return item;
    })
    .filter((item) => item || item === undefined);

  if (parsedArray.some((item) => item !== undefined)) {
    parsed = parsedArray.filter((item) => item).join(" ");
  } else {
    parsed = undefined;
  }

  return parsed;
}

type ClassListToParse = (string | [any, string])[];
