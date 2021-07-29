import Block from '../../modules/block';
import template from './template.hbs';
import { getDataFromForm } from '../../utils/getDataFromForm';
import { redirectToPage } from '../../utils/redirectToPage';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import { AuthApi } from '../../api';
import { MESSENGER_PATH } from '../../routes/constants';

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

			button?.addEventListener('click', () => {
				const data = getDataFromForm();

				AuthApi.signUp(data).then(({ status }) => redirectToPage(status, MESSENGER_PATH));
			});
		});
	}

	render(): string {
		return template(this.props);
	}
}

export const signUpPage = new SignUp(data);
