import { HTTPTransport } from './httpTransport';

const headers = {
	'Content-type': 'application/json',
	accept: 'application/json',
};

export default class UsersApi {
	static updateUserProfile(data) {
		return new HTTPTransport().put('/user/profile', { data, headers });
	}
	static updateUserAvatar(data) {
		return new HTTPTransport().put('/user/profile/avatar', { data, 'Content-type': 'image/png' });
	}
	static updateUserPassword(data) {
		return new HTTPTransport().put('/user/password', { data, headers });
	}
	static getUserById(id) {
		return new HTTPTransport().get(`/user/${id}`, { headers });
	}
	static userSearch(data) {
		return new HTTPTransport().post('/user/search', { data, headers });
	}
}
