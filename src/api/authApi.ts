import { HTTPTransport } from './httpTransport';

const headers = {
	'Content-type': 'application/json',
};

export default class AuthApi {
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
