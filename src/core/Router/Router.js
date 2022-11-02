import {$} from '@core/dom';
import {ActiveRoute} from '@core/Router/ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('No selector');
        }
        
        this.$container = $(selector);
        this.routes = routes;
        this.page = null;
        
        this.changePageHandler = this.changePageHandler.bind(this);
        this.init();
    }
    
    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    }
    
    changePageHandler() {
        if (this.page) {
            this.page.destroy();
            this.$container.clear()
        }
        
        const Page = this.routes[ActiveRoute.param[0]];
        if (Page) {
            this.page = new Page({id: ActiveRoute.param[1]});
        } else {
            this.page = new this.routes.default;
        }
        this.$container.append(this.page.getRoot());
        this.page.afterRender();
    }
    
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    }
}