import Block from '../../modules/block.js';
import { template } from './template.js';
import { findInputsForValidation } from '../../utils/validation.js';
import { Button } from '../../components/Button/Button.js';
import { Input } from '../../components/Input/Input.js';
import AuthApi from '../../api/authApi.js';
import { MESSENGER_PATH } from '../../routes/constants.js';
const BUTTON_ID = 'signInButton';
const data = {
    title: 'Вход',
    link: {
        text: 'Нет аккаунта?',
        href: 'sign-up',
    },
    inputs: [
        {
            input: new Input({
                label: 'Логин',
                name: 'login',
            }).render(),
        },
        {
            input: new Input({
                label: 'Пароль',
                name: 'password',
            }).render(),
        },
    ],
    button: new Button({
        text: 'Авторизоваться',
        id: BUTTON_ID,
    }).render(),
};
export default class SignIn extends Block {
    constructor(props) {
        super(template, props);
        this.onClick();
    }
    onClick() {
        document.addEventListener('DOMContentLoaded', () => {
            const button = document.getElementById(BUTTON_ID);
            button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
                AuthApi.signIn({
                    login: 'Login',
                    password: 'string',
                })
                    .then((res) => {
                    if (res.status === 200) {
                        window.history.pushState({}, '', MESSENGER_PATH);
                        document.location.reload();
                    }
                })
                    .catch((err) => {
                    throw err;
                });
            });
        });
    }
    componentDidMount() {
        return findInputsForValidation;
    }
}
export const signInPage = new SignIn(data);
//# sourceMappingURL=index.js.map