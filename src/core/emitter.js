export class Emitter {
    constructor() {
        this.listeners = {};
    }
    
    //Уведомляет слушателей
    emit(eventName, ...args) {
        if (!Array.isArray(this.listeners[eventName])) {
            return false;
        }
        this.listeners[eventName].forEach(listener => {
            listener(...args);
        });
        return true;
    }
    
    subscribe(eventName, callback) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(callback);
        return () => {
            this.listeners[eventName] = this.listeners[eventName].filter(el => el !== callback);
        };
    }
}


