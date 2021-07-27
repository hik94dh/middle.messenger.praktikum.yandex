import BlockComponent from '../../modules/block';
import template from './template.hbs';

export class Form extends BlockComponent {
	constructor(props) {
		super(template, props);
	}

	render(): string {
		return template(this.props);
	}
}
