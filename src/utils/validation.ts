import { validation } from './validationReg';

export const checkValidation = (input) => {
	const showResult = (isCheck) => {
		input.classList.remove('input-error');
		if (!isCheck) {
			console.log(`Валидация не пройдена в ${input.name}`);
			input.classList.add('input-error');
		}
	};

	if (!input.hasAttribute('readonly')) {
		if (!input.required) {
			input.setAttribute('required', 'true');
		}

		// смотрим на name у инпута и применяем нужную валидацию из validation
		showResult(validation[input.getAttribute('name')]?.test(input.value));
	}
};

export const findInputsForValidation = document.addEventListener('DOMContentLoaded', () => {
	const formCollection = Array.from(document.getElementsByTagName('form'));
	const inputsCollection = document.querySelectorAll<HTMLInputElement>('.js-input');

	inputsCollection.forEach((input) => {
		input.addEventListener('focus', () => {
			checkValidation(input);
		});
		input.addEventListener('blur', () => {
			checkValidation(input);
		});
	});

	formCollection.forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			// XSS обработка
			if (event.srcElement[0].value.includes('href')) {
				return;
			}
			inputsCollection.forEach((input) => {
				checkValidation(input);
			});
		});
	});
});
