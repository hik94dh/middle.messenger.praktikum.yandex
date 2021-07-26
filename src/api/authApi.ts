import BaseApi from './baseApi.js';
import { HTTPTransport } from './httpTransport.js';

const headers = {
	'Content-type': 'application/json',
};

export default class AuthApi extends BaseApi {
	static signIn(data) {
		return new HTTPTransport().post('/auth/signin', { data, headers });
	}
	static signUp(data) {
		return new HTTPTransport().post('/auth/signup', { data, headers });
	}
	static user() {
		return new HTTPTransport().get('/auth/user');
	}
	static logout() {
		return new HTTPTransport().post('/auth/logout', { headers });
	}
}
