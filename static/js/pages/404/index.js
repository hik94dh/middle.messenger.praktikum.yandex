import Block from '../../modules/block.js';
import { template } from './template.js';
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
}
export const page404 = new Page404(data);
//# sourceMappingURL=index.js.map