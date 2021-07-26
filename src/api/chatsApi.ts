import BaseApi from './baseApi.js';
import { HTTPTransport } from './httpTransport.js';

const headers = {
	'Content-type': 'application/json',
};

export default class ChatsApi extends BaseApi {
	static getChats() {
		return new HTTPTransport().get('/chats', { headers });
	}
	static createChat(data) {
		return new HTTPTransport().post('/chats', { data, headers });
	}
	static deleteChat(data) {
		return new HTTPTransport().delete('/chats', { data, headers });
	}
	static getArchivedChats() {
		return new HTTPTransport().get('/chats/archive', { headers });
	}
	static archiveChat(data) {
		return new HTTPTransport().post('/chats/archive', { data, headers });
	}
	static unArchiveChat(data) {
		return new HTTPTransport().post('/chats/unarchive', { data, headers });
	}
	static getChatUsers(id) {
		return new HTTPTransport().get(`/chats/${id}/users`, { headers });
	}
	static getNewMessages(id) {
		return new HTTPTransport().get(`/chats/new/${id}`, { headers });
	}
	static uploadAvatar(data) {
		return new HTTPTransport().put('/chats/avatar', { data, headers });
	}
	static addUsers(data) {
		return new HTTPTransport().put('/chats/users', { data, headers });
	}
	static deleteUsers(data) {
		return new HTTPTransport().delete('/chats/users', { data, headers });
	}
	static getChatUsersById(id) {
		return new HTTPTransport().post(`/chats/token/${id}`, { headers });
	}
}
