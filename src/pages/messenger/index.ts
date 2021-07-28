import Block from '../../modules/block';
import template from './template.hbs';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import { AuthApi, ChatsApi } from '../../api';
import { MESSENGER_PATH } from '../../routes/constants';

import { store } from '../../modules/store';
import { WebSocketModule } from '../../modules/webSocket';

const ENTER_MESSAGE_ID = 'enterMessage';
const CREATE_CHAT = 'createChat';
const CREATE_CHAT_MODAL_BUTTON = 'createChatModalButton';
const ADD_USER_BUTTON = 'addUserButton';
const DELETE_USER_BUTTON = 'deleteUserButton';
const TEXTAREA_ID = 'textarea';

import { getDataFromForm } from '../../utils/getDataFromForm';

const data = {
	isOpenChat: false,
	stopPing: false,
	profile: 'Профиль',
	headerName: '',
	textareaPlaceholder: 'Сообщение',
	emptyChatMessage: 'Выберите чат чтобы отправить сообщение',
	time: '',
	buttonEnter: new Button({
		isCircle: true,
		class: 'button-circle',
		id: ENTER_MESSAGE_ID,
	}).render(),
	createChatButton: new Button({
		text: 'Создать чат',
		id: CREATE_CHAT,
	}).render(),
	textareaId: TEXTAREA_ID,
};

interface Prop {
	[items: string]: any;
}

export default class Messenger extends Block {
	socket: WebSocketModule;

	constructor(props) {
		super(template, props);
		this.socket = null;
	}

	componentDidMount() {
		if (document.location.pathname === MESSENGER_PATH) {
			setInterval(() => {
				if (store.state.isOpenChat && !store.state.stopPing) {
					this.setProps(store.state);
				}
			}, 1000);
			// при загрузке страницы получаем данные, добавляем в стор
			AuthApi.user().then(({ response, status }) => {
				if (status === 200) {
					const data = JSON.parse(response);
					// Получаем данные, формируем массив, добавляем в стор
					store.update({ userId: data.id });
					this.setProps(store.state);
				}
			});
			ChatsApi.getChats().then(({ response, status }) => {
				if (status === 200) {
					const data = JSON.parse(response);
					// Получаем данные, формируем массив, добавляем в стор
					store.update({ newChats: data });
					this.setProps(store.state);
				}
			});
		}
	}

	messengerEvents() {
		const dots = document.querySelector('.chat-dialog_header-dots');
		const dotsBlock = document.querySelector('.chat-dialog_header-dots-block');
		const addUser = document.getElementById('addUser');
		const removeUser = document.getElementById('removeUser');
		const modalBackdrop = document.querySelector('.js-modal-backdrop');
		const attach = document.querySelector('.chat-dialog_footer-attach');
		const attachBlock = document.querySelector('.chat-dialog_footer-attach-block');
		const enterButton = document.getElementById(ENTER_MESSAGE_ID);
		const addUserButton = document.getElementById(ADD_USER_BUTTON);
		const deleteUserButton = document.getElementById(DELETE_USER_BUTTON);
		const textArea = document.getElementById(TEXTAREA_ID);

		textArea?.addEventListener('click', () => {
			if (!store.state.stopPing) {
				store.update({ stopPing: true });
			}
		});
		textArea?.addEventListener('blur', () => {
			const data = getDataFromForm();
			if (data.message && store.state.stopPing) {
				store.update({ stopPing: false });
			}
		});

		modalBackdrop?.addEventListener('click', () => {
			store.update({
				modal: new Modal({
					isOpen: false,
				}).render(),
				stopPing: false,
			});
			this.setProps(store.state);
		});

		// переписать и объединить код
		addUserButton?.addEventListener('click', (e) => {
			e.preventDefault();
			const input = <HTMLFormElement>document.querySelector('.js-modal input');

			if (Number(input.value)) {
				// 83723 - первый
				// 84434 - второй
				ChatsApi.addUsers({
					users: [Number(input.value)],
					chatId: store.state.activeChatId,
				}).then(() => {
					store.update({
						modal: new Modal({
							isOpen: false,
						}).render(),
					});
					this.setProps(store.state);
				});
			}
		});
		deleteUserButton?.addEventListener('click', (e) => {
			e.preventDefault();
			const input = <HTMLFormElement>document.querySelector('.js-modal input');

			if (Number(input.value)) {
				ChatsApi.deleteUsers({
					users: [Number(input.value)],
					chatId: store.state.activeChatId,
				}).then(() => {
					store.update({
						modal: new Modal({
							isOpen: false,
						}).render(),
					});
					this.setProps(store.state);
				});
			}
		});

		enterButton?.addEventListener('click', (e) => {
			e.preventDefault();
			const data = getDataFromForm();
			this.socket.send('message', data.message);

			setTimeout(() => {
				this.setProps(store.state);
			}, 100);
		});

		// при клике на dots показать / скрыть popper и поменять цвет
		dots?.addEventListener('click', (e) => {
			e.preventDefault();
			if (!store.state.stopPing) {
				store.update({ stopPing: true });
			} else {
				store.update({ stopPing: false });
			}
			dotsBlock?.classList.toggle('attach_is-open');
			dots?.classList.toggle('attach_is-open');
		});
		addUser?.addEventListener('click', () => {
			store.update({
				modal: new Modal({
					isOpen: true,
					title: 'Добавить пользователя',
					input: new Input({
						label: 'Введите id пользователя',
					}).render(),
					button: new Button({
						text: 'Добавить',
						type: 'text',
						id: ADD_USER_BUTTON,
					}).render(),
				}).render(),
			});
			this.setProps(store.state);
		});
		removeUser?.addEventListener('click', () => {
			store.update({
				modal: new Modal({
					isOpen: true,
					title: 'Удалить пользователя',
					input: new Input({
						label: 'Введите id пользователя',
					}).render(),
					button: new Button({
						text: 'Удалить',
						type: 'text',
						id: DELETE_USER_BUTTON,
					}).render(),
				}).render(),
			});
			this.setProps(store.state);
		});
		// // при клике на attach показать / скрыть popper и поменять цвет
		attach?.addEventListener('click', () => {
			if (!store.state.stopPing) {
				store.update({ stopPing: true });
			} else {
				store.update({ stopPing: false });
			}
			attachBlock?.classList.toggle('attach_is-open');
			attach.classList.toggle('attach_is-open');
		});

		const createChat = document.getElementById(CREATE_CHAT);

		createChat.addEventListener('click', () => {
			store.update({
				stopPing: true,
				modal: new Modal({
					isOpen: true,
					title: 'Создать чат',
					input: new Input({
						label: 'Название чата',
					}).render(),
					button: new Button({
						text: 'Создать',
						type: 'text',
						id: CREATE_CHAT_MODAL_BUTTON,
					}).render(),
				}).render(),
			});
			this.setProps(store.state);

			const createChatButton = document.getElementById(CREATE_CHAT_MODAL_BUTTON);

			createChatButton?.addEventListener('click', (e) => {
				e.preventDefault();
				const input = <HTMLFormElement>document.querySelector('.js-modal input');

				if (input.value) {
					ChatsApi.createChat({ title: input.value }).then((res: Prop) => {
						if (res.status === 200) {
							ChatsApi.getChats().then(({ response, status }) => {
								if (status === 200) {
									const data = JSON.parse(response);
									// Получаем данные, формируем массив, добавляем в стор
									store.update({
										newChats: data,
										modal: new Modal({
											isOpen: false,
										}).render(),
									});
									this.setProps(store.state);
								}
							});
						}
					});
				}
			});
		});

		const chatListCollection = document.querySelectorAll('.sidebar-chat');

		chatListCollection.forEach((chat) => {
			chat.addEventListener('click', () => {
				const getActiveChatId = chat.getAttribute('chat-id');
				const activeChatId = Number(getActiveChatId);

				const activeChat = store.state.newChats.find((i) => i.id === activeChatId);

				const lastMessageTime = activeChat.last_message?.time;
				const day = new Date(lastMessageTime).getDate();
				const month = new Date(lastMessageTime).getMonth();
				const year = new Date(lastMessageTime).getFullYear();
				const separator = '/';

				const time = lastMessageTime ? `${day}${separator}${month}${separator}${year}` : '';

				store.update({
					activeChatId,
					headerName: activeChat.title,
					time,
					isOpenChat: true,
					newMessages: [activeChat.last_message],
				});
				this.setProps(store.state);

				ChatsApi.getChatUsersById(getActiveChatId).then(({ response }) => {
					const { token } = JSON.parse(response);

					if (token) {
						this.socket = new WebSocketModule(store.state.userId, activeChatId, token);
					}
				});
			});
		});
	}

	addEventsAfterUpdate() {
		this.messengerEvents();
	}

	render(): string {
		return template(this.props);
	}
}

export const messengerPage = new Messenger(data);
