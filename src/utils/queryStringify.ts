export function queryStringify(data) {
	if (!data) return '';

	const result: string[] = [];
	Object.keys(data).forEach((key) => result.push(`${key}=${data[key]}`));
	return `?${result.join('&')}`;
}
