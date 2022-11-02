class Dom {
    constructor(selector) {
        this.$element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }
    html(html) {
        if (typeof html === 'string') {
            this.$element.innerHTML = html;
            return this;
        }
        return this.$element.outerHTML.trim();
    }
    clear() {
        this.html('');
        return this;
    }
    append(node) {
        if (node instanceof Dom) {
            this.$element.append(node.getHtmlNode());
        } else {
            this.$element.append(node);
        }
        return this;
    }
    getHtmlNode() {
        return this.$element;
    }
    on(eventType, callback) {
        this.$element.addEventListener(eventType, callback);
    }
    removeListener(eventType, callback) {
        this.$element.removeEventListener(eventType, callback);
    }
    getElement() {
        return this.$element;
    }
    css(styles = {}) {
        Object.keys(styles).forEach(style => {
            this.$element.style[style] = styles[style];
        });
    }
    find(selector) {
        return this.$element.querySelector(selector);
    }
    findAll(selector) {
        return this.$element.querySelectorAll(selector);
    }
    data(name) {
        return this.$element.dataset[name];
    }
    text(text) {
        if (typeof text === 'string') {
           this.$element.textContent = text; 
           return this;
        } else {
            if (this.$element.tagName.toLowerCase() === 'input') {
                return this.$element.value.trim();
            }
            return this.$element.innerText;
        }
    }
    addClass(className) {
        this.$element.classList.add(className);
    }
    removeClass(className) {
        this.$element.classList.remove(className);
    }
    toggleClass(className) {
        this.$element.classList.toggle(className);
    }
    focus() {
        this.$element.focus();
    }
    getStyles(search = []) {
        let styles = [];
        if (search.length === 0) {
            this.$element.classList.forEach(style => {
                styles.push(style);
            });
        } else {
            search.forEach(style => {
                if (this.$element.classList.contains(style)) {
                    styles.push(style);
                }
            });
        }
        
        return styles;
    }
}

export function $(selector) {
    return selector instanceof Dom ? selector : new Dom(selector);
}

$.create = (tag, classes = '', params = {}) => {
    const element = document.createElement(tag);
    
    if (classes) {
        element.classList.add(classes);
    }
    
    for (let key of Object.keys(params)) {
        element[key] = params[key];
    }
    
    return $(element);
}