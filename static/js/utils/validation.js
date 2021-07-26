import { validation } from './validationReg.js';
export const checkValidation = (input) => {
    var _a;
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
        showResult((_a = validation[input.getAttribute('name')]) === null || _a === void 0 ? void 0 : _a.test(input.value));
    }
};
export const findInputsForValidation = document.addEventListener('DOMContentLoaded', () => {
    const formCollection = Array.from(document.getElementsByTagName('form'));
    const inputsCollection = document.querySelectorAll('.js-input');
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
//# sourceMappingURL=validation.js.map