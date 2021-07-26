import BlockComponent from '../../modules/block.js';
import { modalTemplate } from './template.js';

export class Modal extends BlockComponent {
	constructor(props) {
		super(modalTemplate, props);
	}

	render(): any {
		return this.compile(this.props);
	}
}
