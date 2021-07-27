class Store {
	private readonly _state: any;

	constructor(state: any) {
		this._state = state;
	}

	get state() {
		return this._state;
	}

	update(newData, action = '') {
		if (action === 'push') {
			this._state.newMessages.push(newData);
			return;
		}
		return Object.assign(this._state, newData);
	}
}

export const store = new Store({});
