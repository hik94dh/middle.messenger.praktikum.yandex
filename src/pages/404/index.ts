import Block from '../../modules/block';
import template from './template.hbs';

const data = {
	title: '404',
	desc: 'Не туда попали',
	link: {
		text: 'Назад к чатам',
		href: 'messenger',
	},
};

export default class Page404 extends Block {
	constructor(props) {
		super(template, props);
	}

	render(): string {
		return template(this.props);
	}
}

export const page404 = new Page404(data);
