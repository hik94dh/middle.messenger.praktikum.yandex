import { store } from './store';

export class WebSocketModule {
	static baseUrl = 'wss://ya-praktikum.tech/ws/chats/';
	private socket: WebSocket;
	pingTimeoutId: any;

	constructor(userId: number, chatId: number, tokenValue: string) {
		this.socket = new WebSocket(`${WebSocketModule.baseUrl}${userId}/${chatId}/${tokenValue}`);
		this.pingTimeoutId = -1;

		this.socket.addEventListener('open', () => {
			console.log('Соединение установлено тут');

			this.send('get old', '0');

			this.pingTimeoutId = setInterval(() => {
				this.ping();
			}, 5000);
		});
		this.socket.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			if (data.type === 'error') return;

			if (data.type === 'message') {
				// console.log(data);
				//Array.isArray(data) ? data[0] : data
				store.update(data, 'push');
			}
		});
		this.socket.addEventListener('close', () => {
			console.log('Соединение закрыто');
		});
	}

	send(type: string, content: string) {
		this.socket.send(
			JSON.stringify({
				type,
				content,
			}),
		);
	}

	close() {
		clearInterval(this.pingTimeoutId);
		this.socket.close();
	}
	private ping() {
		this.send('ping', '');
	}
}
