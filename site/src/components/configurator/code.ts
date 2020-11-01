import {
	StringListToFilter,
	filterStringList,
} from "@smui/core/common/functions";
import { stripIndent } from "common-tags";

export function generateSvelteCode({
	tag = "",
	props = [],
	content = "",
	indentSize,
}: {
	tag: string;
	props: StringListToFilter;
	content: string;
	indentSize?: number;
}) {
	const filteredProps = filterStringList(props) || [];

	const propsIntend = `
			`.substr(1);
	let parsedProps = filteredProps.join(" \n" + propsIntend);
	if (parsedProps.length > 0) parsedProps = " " + parsedProps;

	const code = stripIndent`
		<${tag}${parsedProps}>
${indentCode({ code: stripIndent(content), indentSize: 3 })}
		</${tag}>
	`;

	const result = indentCode({ code, indentSize });

	return result;
}

export function generateSCSSCode({
	content = "",
	indentSize,
}: {
	content: string;
	indentSize?: number;
}) {
	const code = stripIndent(content);
	const result = indentCode({ code, indentSize });
	return result;
}

export function indentCode({
	code,
	indentSize = 0,
	isContent = false,
}: {
	code: string;
	indentSize?: number;
	isContent?: boolean;
}) {
	const startIndent = "	".repeat(indentSize);

	let innerIndentSize = isContent ? indentSize + 3 : indentSize;
	const indent = "	".repeat(innerIndentSize);

	const result = startIndent + code.replace(/\n/g, "\n" + indent);
	return result;
}
