export function queryStringify(data) {
    if (!data)
        return '';
    let result = [];
    Object.keys(data).forEach((key) => result.push(`${key}=${data[key]}`));
    return `?${result.join('&')}`;
}
//# sourceMappingURL=queryStringify.js.map