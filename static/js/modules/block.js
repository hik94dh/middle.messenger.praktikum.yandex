import { EventBus } from './eventBus.js';
export default class Block {
    constructor(template, props = {}) {
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus();
        this._meta = { template, props };
        this._element = this._createDocumentElement('div');
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    compile(props) {
        return Handlebars.compile(this._meta.template)(props);
    }
    _render() {
        this._element.innerHTML = this.render();
    }
    render() {
        return this.compile(this.props);
    }
    getContent() {
        return this._element;
    }
    _makePropsProxy(props) {
        return new Proxy(props, {
            set: (target, prop, value) => {
                target[prop] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount() { }
    addEventsAfterUpdate() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
            this.addEventsAfterUpdate();
        }
    }
    componentDidUpdate(oldProps, newProps) {
        return oldProps !== newProps;
    }
    show() {
        this._element.style.display = 'block';
    }
    hide() {
        this._element.style.display = 'none';
    }
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
};
//# sourceMappingURL=block.js.map