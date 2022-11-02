import {ExcelComponent} from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent{
    constructor(...args) {
        super(...args);
    }
    
    get template() {
        
    }
    
    initState(state = {}) {
        this.state = {...state};
    }
    
    setState(newState) {
        this.state = {...newState};
        this.$root.html(this.template)
    }
}