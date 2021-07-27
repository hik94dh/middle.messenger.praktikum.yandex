interface Data {
	[key: string]: string;
}

export function getDataFromForm() {
	const form = <HTMLFormElement>document.querySelector('form');
	const formData = new FormData(form);
	const data: Data = {};
	// console.log('form', form.getElementsByTagName('input'))

	// const inputsCollection = Array.from(form.getElementsByTagName('input'));
	//
	// inputsCollection.forEach(i => console.log(i.classList.contains('input-error')))

	formData.forEach((value: string, key: string) => {
		data[key] = value;
	});

	return data;
}
