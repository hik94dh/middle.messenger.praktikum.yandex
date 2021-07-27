interface Data {
	[key: string]: string;
}

export function getDataFromForm() {
	const form = <HTMLFormElement>document.querySelector('form');
	const formData = new FormData(form);
	const data: Data = {};

	formData.forEach((value: string, key: string) => {
		data[key] = value;
	});

	return data;
}
