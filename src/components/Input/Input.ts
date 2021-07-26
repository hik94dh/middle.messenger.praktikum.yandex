import BlockComponent from '../../modules/block.js';
import { inputTemplate } from './template.js';

export class Input extends BlockComponent {
	constructor(props) {
		super(inputTemplate, props);
	}

	render(): any {
		return this.compile(this.props);
	}
}
