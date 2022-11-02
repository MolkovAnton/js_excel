import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar, getToolbarButtons} from '@/components/toolbar/toolbar.template';
import * as actions from '@/redux/actions'

export class Toolbar extends ExcelStateComponent {
    static className = 'excell__toolbar'
    
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['cellStyle'],
            ...options
        });
        this.buttons = getToolbarButtons();
        this.initState({format_align_left: true});
    }
    
    get template() {
        return createToolbar(this.state);
    }
    
    toHTML() {
        return this.template;
    }
    
    onClick(event) {
        this.activateEvent(event);
    }
    
    init() {
        super.init();
        this.$on('Table:selectCell', styles => {
            let newState = {format_align_left: true};
            styles.forEach(style => this.prepairNewState(style, newState));
            this.setState(newState);
        });
    }
    
    prepairNewState(style, state = {}) {
        const type = this.buttons[style].type || false;
        let newState = state;
        if (type) {
            for (const button in this.buttons) {
                if (this.buttons[button].type === type && newState[button]) {
                    newState[button] = false;
                }
            }
        }
        newState[style] = newState[style] ? false : true;
        return newState;
    }
    
    onButtonClick(event) {
        const action = $(event.target).data('action');
        let newState = this.state;
        this.prepairNewState(action, newState);
        this.setState(newState);
        
        this.$emit('Toolbar:buttonSelect', newState);
    }
}
