import Block from '../../modules/block.js';
import { template } from './template.js';
import { findInputsForValidation } from '../../utils/validation.js';
import { Button } from '../../components/Button/Button.js';
import { Input } from '../../components/Input/Input.js';
import AuthApi from '../../api/authApi.js';
const BUTTON_ID = 'signUpButton';
const data = {
    title: 'Регистрация',
    entry: 'Войти',
    link: {
        text: 'Войти',
        href: 'sign-in',
    },
    button: new Button({
        text: 'Зарегистрироваться',
        id: BUTTON_ID,
    }).render(),
    inputs: [
        {
            input: new Input({
                label: 'Почта',
                name: 'email',
            }).render(),
        },
        {
            input: new Input({
                label: 'Логин',
                name: 'login',
            }).render(),
        },
        {
            input: new Input({
                label: 'Имя',
                name: 'first_name',
            }).render(),
        },
        {
            input: new Input({
                label: 'Фамилия',
                name: 'second_name',
            }).render(),
        },
        {
            input: new Input({
                label: 'Телефон',
                name: 'phone',
            }).render(),
        },
        {
            input: new Input({
                label: 'Пароль',
                name: 'password',
            }).render(),
        },
        {
            input: new Input({
                label: 'Пароль (ещё раз)',
                name: 'password',
            }).render(),
        },
    ],
};
export default class SignUp extends Block {
    constructor(props) {
        super(template, props);
        this.onClick();
    }
    onClick() {
        document.addEventListener('DOMContentLoaded', () => {
            const button = document.getElementById(BUTTON_ID);
            button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
                AuthApi.signUp({
                    first_name: 'string',
                    second_name: 'string',
                    login: 'Login',
                    email: 'string@test.ru',
                    password: 'string',
                    phone: '+712345678',
                });
            });
        });
    }
    componentDidMount() {
        return findInputsForValidation;
    }
    render() {
        return this.compile(data);
    }
}
export const signUpPage = new SignUp(data);
//# sourceMappingURL=index.js.map