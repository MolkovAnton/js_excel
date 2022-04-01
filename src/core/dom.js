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
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tag, classes = '') => {
    const element = document.createElement(tag);
    if (classes) {
        element.classList.add(classes);
    }
    return $(element);
}