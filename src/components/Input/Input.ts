import BlockComponent from '../../modules/block';
import template from './template.hbs';
import { findInputsForValidation } from '../../utils/validation';
// import templateProfile from './template-profile.hbs';
// import { PROFILE_PATH } from '../../routes/constants';
// const isProfilePage = document.location.pathname === PROFILE_PATH;

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
