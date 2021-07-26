const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

export class HTTPTransport {
	URL: string = 'https://ya-praktikum.tech/api/v2';
	_url: string;

	constructor() {
		this._url = this.URL;
	}

	get = (url, options = {}) => {
		return this.request(this._url + url, { ...options, method: METHODS.GET });
	};
	post = (url, options = {}) => {
		return this.request(this._url + url, { ...options, method: METHODS.POST });
	};
	put = (url, options = {}) => {
		return this.request(this._url + url, { ...options, method: METHODS.PUT });
	};
	delete = (url, options = {}) => {
		return this.request(this._url + url, { ...options, method: METHODS.DELETE });
	};

	// options:
	// headers — obj
	// data — obj
	request = (url, options, timeout = 5000) => {
		const { method, data, headers } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url);
			xhr.withCredentials = true;

			if (headers) {
				Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
			}
			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.timeout = timeout;

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = () => {
				reject(new Error('Ошибка'));
			};

			if (method === METHODS.GET || !data) {
				xhr.send();
				return;
			}
			if (method === METHODS.POST) {
				xhr.send(JSON.stringify(data));
				return;
			}
		});
	};
}
