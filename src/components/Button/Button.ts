import BlockComponent from '../../modules/block.js';
import { buttonTemplate } from './template.js';

export class Button extends BlockComponent {
	constructor(props) {
		super(buttonTemplate, props);
	}

	render(): any {
		return this.compile(this.props);
	}
}
