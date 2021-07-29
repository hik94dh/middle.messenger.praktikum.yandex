import BlockComponent from '../../modules/block';
import template from './template.hbs';
import { findInputsForValidation } from '../../utils/validation';

export class Input extends BlockComponent {
	constructor(props) {
		super(template, props);
	}

	componentDidMount() {
		return findInputsForValidation;
	}

	render(): string {
		return template(this.props);
	}
}
