export class DomListener {
    registeredListeners = []
    constructor(root, listeners = []) {
        if (!root) {
            throw new Error('No root element for DomListener');
        }
        this.$root = root;
        this.listeners = listeners;
    }
    initDomListeners() {
        this.listeners.forEach(listener => {
            const callback = makeListenerFunctionName(listener);
            if (this[callback]) {
                const func = this[callback].bind(this);
                this.$root.on(listener, func);
                this.registeredListeners.push({
                    type: listener,
                    callback: func
                });
            }
        });
    }
    removeDomListeners() {
        this.registeredListeners.forEach(listener => {
            this.$root.removeListener(listener.type, listener.callback);
        });
    }
    activateEvent(event) {
        const eventName = 'event_' + event.type;
        const eventFunction = event.target.dataset[eventName];
        if (typeof this[eventFunction] === 'function') {
            this[eventFunction].apply(this, [event]);
        }
    }
}

function makeListenerFunctionName(eventType) {
    if (typeof eventType !== 'string') {
        return '';
    }
    return 'on' + eventType.charAt(0).toUpperCase() + eventType.slice(1);
}
