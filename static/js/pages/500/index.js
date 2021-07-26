import Block from '../../modules/block.js';
import { template } from './template.js';
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
}
export const page500 = new Page500(data);
//# sourceMappingURL=index.js.map