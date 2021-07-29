import Block from '../../modules/block';
import template from './template.hbs';
import { getDataFromForm } from '../../utils/getDataFromForm';
import { redirectToPage } from '../../utils/redirectToPage';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import { AuthApi } from '../../api';
import { MESSENGER_PATH, MAIN_PATH, SIGN_IN_PATH } from '../../routes/constants';

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

	componentDidMount() {
		if (document.location.pathname === MAIN_PATH) {
			AuthApi.user().then(({ status }) =>
				redirectToPage(status, status === 200 ? MESSENGER_PATH : SIGN_IN_PATH, true),
			);
		}
	}

	onClick() {
		document.addEventListener('DOMContentLoaded', () => {
			const button = document.getElementById(BUTTON_ID);

			button?.addEventListener('click', () => {
				const data = getDataFromForm();

				AuthApi.signIn(data)
					.then(({ status }) => redirectToPage(status, MESSENGER_PATH))
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
