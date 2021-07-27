import Block from '../../modules/block';
import template from './template.hbs';
import { getDataFromForm } from '../../utils/getDataFromForm';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import { AuthApi } from '../../api';
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
	[items: string]: any;
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
				const data = getDataFromForm();

				// const data = {
				// 	login: 'Login',
				// 	password: 'string',
				// }
				AuthApi.signIn(data)
					.then((res: Prop) => {
						if (
							res.status === 200 ||
							(res.status === 400 && JSON.parse(res.responseText).reason === 'User already in system')
						) {
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

	render(): string {
		return template(this.props);
	}
}

export const signInPage = new SignIn(data);
