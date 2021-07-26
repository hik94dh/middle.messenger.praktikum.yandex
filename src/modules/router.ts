import { render } from '../utils/render.js';
import Block from './block.js';

function isEqual(lhs, rhs) {
	return lhs === rhs;
}

class Route {
	_pathname: any;
	_blockView: Block;
	_block: any;
	_props: any;

	constructor(pathname: string, view: Block, props: any) {
		this._pathname = pathname;
		this._blockView = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		if (!this._block) {
			this._block = this._blockView;
			render(this._props.rootQuery, this._block);
			return;
		}

		this._block.show();
	}
}

export default class Router {
	routes: any;
	history: any;
	_currentRoute: any;
	_rootQuery: any;
	private static __instance: any;

	constructor(rootQuery) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });
		this.routes.push(route);
		return this;
	}

	start() {
		// Реагируем на изменения в адресной строке и вызываем перерисовку
		window.onpopstate = (event) => {
			this._onRoute(event.currentTarget.location.pathname);
		};
		this._onRoute(document.location.pathname);
	}

	_onRoute(pathname) {
		const route = this.getRoute(pathname);

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		if (route) {
			this._currentRoute = route;
			route.render();
		}
	}

	go(pathname) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname) {
		return this.routes.find((route) => route.match(pathname));
	}
}
