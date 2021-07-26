// @ts-ignore
import sinon from 'sinon';
import { HTTPTransport } from './httpTransport';

describe('HTTPTransport', () => {
	const http = new HTTPTransport();
	const BASE_URL = 'https://ya-praktikum.tech/api/v2';

	beforeEach(function () {
		this.xhr = sinon.useFakeXMLHttpRequest();

		this.requests = [];
		this.xhr.onCreate = function (xhr) {
			this.requests.push(xhr);
		}.bind(this);
	});

	afterEach(function () {
		this.xhr.restore();
	});

	it('check method get', () => {
		const URL = '/auth/user';
		const METHOD = 'GET';

		http.request = sinon.spy();
		http.get(URL);
		sinon.assert.calledWith(http.request, `${BASE_URL}${URL}`, { method: METHOD });
	});

	it('check method post', () => {
		const URL = '/auth/signin';
		const METHOD = 'POST';

		const data = {
			login: 'Login',
			password: 'string',
		};

		http.request = sinon.spy();
		http.post(URL, { data });
		sinon.assert.calledWith(http.request, `${BASE_URL}${URL}`, { data, method: METHOD });
	});

	it('check method put', () => {
		const URL = '/chats/users';
		const METHOD = 'PUT';

		const data = {
			users: [0],
			chatId: 0,
		};

		http.request = sinon.spy();
		http.put(URL, { data });
		sinon.assert.calledWith(http.request, `${BASE_URL}${URL}`, { data, method: METHOD });
	});

	it('check method delete', () => {
		const URL = '/chats/users';
		const METHOD = 'DELETE';

		const data = {
			users: [0],
			chatId: 0,
		};

		http.request = sinon.spy();
		http.delete(URL, { data });
		sinon.assert.calledWith(http.request, `${BASE_URL}${URL}`, { data, method: METHOD });
	});
});
