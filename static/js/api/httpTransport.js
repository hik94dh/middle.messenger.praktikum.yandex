const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};
export class HTTPTransport {
    constructor() {
        this.URL = 'https://ya-praktikum.tech/api/v2';
        this.get = (url, options = {}) => {
            return this.request(this._url + url, Object.assign(Object.assign({}, options), { method: METHODS.GET }));
        };
        this.post = (url, options = {}) => {
            return this.request(this._url + url, Object.assign(Object.assign({}, options), { method: METHODS.POST }));
        };
        this.put = (url, options = {}) => {
            return this.request(this._url + url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }));
        };
        this.delete = (url, options = {}) => {
            return this.request(this._url + url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }));
        };
        // options:
        // headers — obj
        // data — obj
        this.request = (url, options, timeout = 5000) => {
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
        this._url = this.URL;
    }
}
//# sourceMappingURL=httpTransport.js.map