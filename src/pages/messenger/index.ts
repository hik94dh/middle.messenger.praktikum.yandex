import Block from '../../modules/block';
import template from './template.hbs';
import { findInputsForValidation } from '../../utils/validation';

import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import ChatsApi from '../../api/chatsApi';
import { MESSENGER_PATH } from '../../routes/constants';

const data = {
	profile: 'Профиль',
	searchPlaceholder: 'Поиск',
	headerName: 'Вадим',
	textareaPlaceholder: 'Сообщение',
	chat: {
		isOpen: true,
		time: '19 июня',
		emptyChatMessage: 'Выберите чат чтобы отправить сообщение',
	},
	messages: [
		{
			text:
				'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n        \n          Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
			class: 'chat-dialog_message-item-from',
			time: '11:56',
			image: null,
		},
		{
			image: './assets/img/image-1.jpg',
			time: '11:56',
		},
		{
			text: 'Круто!',
			class: 'chat-dialog_message-item-to',
			time: '12:00',
			icon: true,
			classForTime: 'chat-dialog_message-item-time-to',
		},
	],
	chats: [
		{
			name: 'Андрей',
			message: 'Изображение',
			time: '10:49',
			messagesCount: 2,
		},
		{
			name: 'Киноклуб',
			message: 'стикер',
			messageBold: 'Вы:',
			time: '12:00',
		},
		{
			name: 'Илья',
			message: 'Друзья, у меня для вас особенный выпуск новостей!...',
			time: '15:12',
			messagesCount: 4,
		},
		{
			name: 'Вадим',
			message: 'Круто!',
			messageBold: 'Вы:',
			time: 'Пт',
			isActive: 'sidebar-chat_is-active',
		},
	],
	modal: new Modal({
		title: 'Добавить пользователя',
		input: new Input({
			label: 'Логин',
		}).render(),
		button: new Button({
			text: 'Добавить',
			type: 'text',
		}).render(),
	}).render(),
	buttonEnter: new Button({
		isCircle: true,
		class: 'button-circle',
	}).render(),
};

export default class Messenger extends Block {
	constructor(props) {
		super(template, props);

		this.addEvents();
	}

	messengerEvents() {
		const dots = document.querySelector('.chat-dialog_header-dots');
		const dotsBlock = document.querySelector('.chat-dialog_header-dots-block');
		const addUser = document.getElementById('addUser');
		const removeUser = document.getElementById('removeUser');
		const modal = document.querySelector('.js-modal');
		const attach = document.querySelector('.chat-dialog_footer-attach');
		const attachBlock = document.querySelector('.chat-dialog_footer-attach-block');

		// при клике на dots показать / скрыть popper и поменять цвет
		dots?.addEventListener('click', () => {
			dotsBlock?.classList.toggle('attach_is-open');
			dots?.classList.toggle('attach_is-open');
		});
		addUser?.addEventListener('click', () => {
			modal?.classList.toggle('is-open-modal');
		});
		removeUser?.addEventListener('click', () => {
			modal?.classList.toggle('is-open-modal');
		});
		// при клике на attach показать / скрыть popper и поменять цвет
		attach?.addEventListener('click', () => {
			// modal?.classList.toggle("is-open-modal");
			attachBlock?.classList.toggle('attach_is-open');
			attach.classList.toggle('attach_is-open');
		});
	}

	addEvents() {
		document.addEventListener('DOMContentLoaded', () => {
			this.messengerEvents();
		});
	}

	componentDidMount() {
		if (document.location.pathname === MESSENGER_PATH) {
			ChatsApi.getChats();
		}

		return findInputsForValidation;
	}

	render(): string {
		return template(this.props);
	}
}

export const messengerPage = new Messenger(data);
