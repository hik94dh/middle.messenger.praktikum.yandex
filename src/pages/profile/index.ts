import Block from '../../modules/block';
import template from './template.hbs';
import { getDataFromForm } from '../../utils/getDataFromForm';
import { redirectToPage } from '../../utils/redirectToPage';

import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import { AuthApi, UsersApi } from '../../api';
import { PROFILE_PATH, MAIN_PATH } from '../../routes/constants';

const CHANGE_IMAGE_ID = 'changeImage';
const CHANGE_IMAGE_INPUT_ID = 'changeImageInput';
const CHANGE_IMAGE_BUTTON_ID = 'changeImageButton';
const SAVE_BUTTON_ID = 'saveButton';
const CHANGE_IMAGE_LABEL_ID = 'changeImageLabel';
const BUTTON_BACK_ID = 'buttonBack';
const LINK_ID = 'js-link';
const LINK_LOGOUT_ID = 'js-link-logout';
const CHANGE_DATA_LINK_ID = 'changeDataLink';
const CHANGE_PASSWORD_LINK_ID = 'changePasswordLink';
import { store } from '../../modules/store';
import { getDataFromApi } from '../../utils/getDataFromApi';

const changePasswordListData = [
	{ name: 'oldPassword', label: 'Старый пароль', value: '', type: 'password', placeholder: '••••••••' },
	{ name: 'newPassword', label: 'Новый пароль', value: '', type: 'password', placeholder: '•••••••••••' },
	{ name: 'newPassword', label: 'Повторите новый пароль', value: '', type: 'password', placeholder: '•••••••••••' },
];

const defaultData = {
	avatarPath: '',
	avatarAlt: 'Поменять аватар',
	changeImageId: CHANGE_IMAGE_ID,
	buttonBack: new Button({
		isCircle: true,
		class: 'button-circle',
		id: BUTTON_BACK_ID,
	}).render(),
	buttonSave: new Button({
		text: 'Сохранить',
		id: SAVE_BUTTON_ID,
	}).render(),
	linksShow: true,
	links: [
		{
			text: 'Изменить данные',
			class: LINK_ID,
			linkId: CHANGE_DATA_LINK_ID,
		},
		{
			text: 'Изменить пароль',
			class: LINK_ID,
			linkId: CHANGE_PASSWORD_LINK_ID,
		},
		{
			href: '/',
			text: 'Выйти',
			class: `link-secondary ${LINK_LOGOUT_ID}`,
		},
	],
	changePasswordShow: false,
	changePasswordList: changePasswordListData.map((props) => new Input(props).render()),
};

export default class Profile extends Block {
	props: Record<string, any>;

	constructor(props = {}) {
		super(template, props);
	}

	componentDidMount() {
		if (document.location.pathname === PROFILE_PATH) {
			AuthApi.user().then(({ response, status }) => {
				const data = getDataFromApi(status, response);

				const arr = [
					{ name: 'email', label: 'Почта', value: data.email, type: 'email', attr: 'readonly' },
					{ name: 'login', label: 'Логин', value: data.login, type: 'text', attr: 'readonly' },
					{ name: 'first_name', label: 'Имя', value: data.first_name, type: 'text', attr: 'readonly' },
					{
						name: 'second_name',
						label: 'Фамилия',
						value: data.second_name,
						type: 'text',
						attr: 'readonly',
					},
					{
						name: 'display_name',
						label: 'Имя в чате',
						value: data.display_name,
						type: 'text',
						attr: 'readonly',
					},
					{ name: 'phone', label: 'Телефон', value: data.phone, type: 'phone', attr: 'readonly' },
				];

				store.update({
					...data,
					avatarPath: data.avatar,
					inputs: arr.map((props) => new Input({ ...props, class: 'justify-between flex-row' }).render()),
				});
				this.setProps(store.state);
			});
		}
	}

	profileEvents() {
		const changeImage = document.getElementById(CHANGE_IMAGE_ID);
		const changeImageInput = <HTMLInputElement>document.getElementById(CHANGE_IMAGE_INPUT_ID);
		const changeImageButton = document.getElementById(CHANGE_IMAGE_BUTTON_ID);
		const saveButton = document.getElementById(SAVE_BUTTON_ID);
		const changeImageHint = document.querySelector('.profile-image_hint');
		const changeImageLabel = <HTMLInputElement>document.getElementById(CHANGE_IMAGE_LABEL_ID);
		const modalTitle = document.querySelector('.js-modal-title');
		const buttonBack = document.getElementById(BUTTON_BACK_ID);
		const modalBackdrop = document.querySelector('.js-modal-backdrop');
		const changeDataLink = document.getElementById(CHANGE_DATA_LINK_ID);
		const changePasswordLink = document.getElementById(CHANGE_PASSWORD_LINK_ID);
		const linkLogout = document.querySelector(`.${LINK_LOGOUT_ID}`);

		changeDataLink?.addEventListener('click', (e) => {
			e.preventDefault();
			this.setProps({ linksShow: false });
			// При клике на первую ссылку убираем атрибут чтобы можно было ввести данные
			const inputsCollection = document.querySelectorAll<HTMLInputElement>('.js-input');

			inputsCollection.forEach((input) => {
				input.removeAttribute('readonly');
			});
		});
		changePasswordLink?.addEventListener('click', (e) => {
			e.preventDefault();
			this.setProps({ linksShow: false, changePasswordShow: true });
		});
		linkLogout?.addEventListener('click', (e) => {
			e.preventDefault();

			AuthApi.logout().then(({ status }) => redirectToPage(status, MAIN_PATH));
		});

		// При клике на картинку открыть модалку
		changeImage?.addEventListener('click', () => {
			store.update({
				modal: new Modal({
					isOpen: true,
					id: 'profile-image_input',
					title: 'Загрузите файл',
					input: new Input({
						label: 'Выбрать файл на компьютере',
						class: 'profile-image_input',
						type: 'file',
						accept: 'image/*,image/jpeg',
						multiple: true,
						name: CHANGE_IMAGE_INPUT_ID,
						labelId: CHANGE_IMAGE_LABEL_ID,
					}).render(),
					hint: {
						show: true,
						text: 'Нужно выбрать файл',
					},
					button: new Button({
						text: 'Поменять',
						type: 'submit',
						id: CHANGE_IMAGE_BUTTON_ID,
					}).render(),
				}).render(),
			});
			this.setProps(store.state);
		});
		changeImageInput?.addEventListener('change', (e) => {
			const target = e.target as HTMLInputElement;
			const file: File = (target.files as FileList)[0];

			// Поменять title и label после загрузки файла
			if (file.name && modalTitle) {
				changeImageLabel.textContent = file.name;
				modalTitle.textContent = 'Файл загружен';
			}
			// Убрать подсказку, когда загрузили файл
			if (changeImageInput?.files?.length) {
				changeImageHint?.classList.remove('show-hint');
			}
		});
		changeImageButton?.addEventListener('click', (e) => {
			// При клике на кнопку показать подсказку, если ничего не загружено
			e.preventDefault();
			if (!changeImageInput?.files?.length) {
				changeImageHint?.classList.add('show-hint');
			}
		});

		// При клике на кнопку обновить данные
		saveButton?.addEventListener('click', () => {
			const data = getDataFromForm();

			if (this.props.changePasswordShow) {
				UsersApi.updateUserPassword(data).then(({ status }) => {
					if (status === 200) {
						document.location.reload();
					}
				});
			} else {
				UsersApi.updateUserProfile(data).then(({ status }) => {
					if (status === 200) {
						document.location.reload();
					}
				});
			}
		});
		buttonBack?.addEventListener('click', () => {
			window.history.back();
		});
		modalBackdrop?.addEventListener('click', () => {
			store.update({
				modal: new Modal({
					isOpen: false,
				}).render(),
			});
			this.setProps(store.state);
		});
	}

	addEventsAfterUpdate() {
		this.profileEvents();
	}

	render(): string {
		return template(this.props);
	}
}

export const profilePage = new Profile(defaultData);
