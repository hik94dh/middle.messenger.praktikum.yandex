import BlockComponent from '../../modules/block.js';
import { inputTemplate } from './template.js';
export class Input extends BlockComponent {
    constructor(props) {
        super(inputTemplate, props);
    }
    render() {
        return this.compile(this.props);
    }
}
//# sourceMappingURL=Input.js.map