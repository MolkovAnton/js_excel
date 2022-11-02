import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter || null;
        this.subscribe = options.subscribe || [];
        this.unsubscribers = [];
        this.store = options.store;
    }
    toHTML() {
        return '';
    }
    init() {
        this.initDomListeners();
    }
    destroy() {
        this.removeDomListeners();
        this.unsubscribers.forEach(sub => sub());
    }
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    $on(event, fn) {
        const subscribe = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(subscribe);
    }
    $dispatch(action) {
        this.store.dispatch(action);
    }
    storeChanged() {
        
    }
    isWatching(key) {
        return this.subscribe.includes(key);
    }
}
