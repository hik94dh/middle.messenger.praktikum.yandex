import Block from '../../modules/block';
import template from './template.hbs';

const data = {
	title: '500',
	desc: 'Мы уже фиксим',
	link: {
		text: 'Назад к чатам',
		href: 'messenger',
	},
};

export default class Page500 extends Block {
	constructor(props) {
		super(template, props);
	}

	render(): string {
		return template(this.props);
	}
}

export const page500 = new Page500(data);
