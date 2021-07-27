import Block from '../../modules/block';
import template from './template.hbs';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import ChatsApi from '../../api/chatsApi';
import AuthApi from '../../api/authApi';
import { MESSENGER_PATH } from '../../routes/constants';

import { store } from '../../modules/store';
import { WebSocketModule } from '../../modules/webSocket';

const ENTER_MESSAGE_ID = 'enterMessage';

import { getDataFromForm } from '../../utils/getDataFromForm';

const data = {
	isOpenChat: false,
	profile: 'Профиль',
	searchPlaceholder: 'Поиск',
	headerName: 'Вадим',
	textareaPlaceholder: 'Сообщение',
	chat: {
		time: '19 июня',
		emptyChatMessage: 'Выберите чат чтобы отправить сообщение',
	},
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
		id: ENTER_MESSAGE_ID,
	}).render(),
};

interface Prop {
	[items: string]: any;
}

export default class Messenger extends Block {
	socket: WebSocketModule;

	constructor(props) {
		super(template, props);
		this.socket = null;

		setInterval(() => {
			this.setProps(store.state);
		}, 5000)
	}

	componentDidMount() {
		if (document.location.pathname === MESSENGER_PATH) {
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
		const modal = document.querySelector('.js-modal');
		const attach = document.querySelector('.chat-dialog_footer-attach');
		const attachBlock = document.querySelector('.chat-dialog_footer-attach-block');
		const enterButton = document.getElementById(ENTER_MESSAGE_ID);
		const addUserButton = document.getElementById('add-user');

		addUserButton?.addEventListener('click', () => {
			ChatsApi.addUsers({
				users: [84434],
				chatId: 104,
			});
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

		const createChat = document.getElementById('create-chat');

		createChat.addEventListener('click', () => {
			ChatsApi.createChat({ title: 'chatName' }).then((res: Prop) => {
				if(res.status === 200) {
					ChatsApi.getChats().then(({ response, status }) => {
						if (status === 200) {
							const data = JSON.parse(response);
							// Получаем данные, формируем массив, добавляем в стор

							store.update({newChats:data})
							this.setProps(store.state);
						}
					})
				}
			});
		});

		const chatListCollection = document.querySelectorAll('.sidebar-chat');

		chatListCollection.forEach((chat) => {
			chat.addEventListener('click', () => {
				const activeChatId = chat.getAttribute('chat-id');

				const activeChat = store.state.newChats.find((i) => i.id === Number(activeChatId));

				store.update({ isOpenChat: true, newMessages: [activeChat.last_message] });

				this.setProps(store.state);

				ChatsApi.getChatUsersById(1).then(({ response }) => {
					const { token } = JSON.parse(response);

					if (token) {
						this.socket = new WebSocketModule(store.state.userId, 1, token);
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
