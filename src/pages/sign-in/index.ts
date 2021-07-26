import Block from '../../modules/block';
import template from './template.hbs';
import { findInputsForValidation } from '../../utils/validation';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import AuthApi from '../../api/authApi';
import { MESSENGER_PATH } from '../../routes/constants';

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

interface Prop {
	[items: string]: unknown;
}

export default class SignIn extends Block {
	constructor(props) {
		super(template, props);

		this.onClick();
	}

	onClick() {
		document.addEventListener('DOMContentLoaded', () => {
			const button = document.getElementById(BUTTON_ID);

			button?.addEventListener('click', () => {
				AuthApi.signIn({
					login: 'Login',
					password: 'string',
				})
					.then((res: Prop) => {
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

	render(): string {
		return template(this.props);
	}
}

export const signInPage = new SignIn(data);
