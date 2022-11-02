import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';

export class Header extends ExcelComponent {
    static className = 'excell__header'
    
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['keyup', 'click'],
            ...options
        });
        this.listName = this.store.getState().listName;
        this.id = this.store.getState().id;
    }
    
    onKeyup(event) {
        this.activateEvent(event);
    }
    
    onClick(event) {
        this.activateEvent(event);
    }
    
    listNameChange(event) {
        if (event.key === 'Enter') {
            this.listName = event.target.value;
            this.$dispatch(actions.listNameChange(this.listName));
            event.target.blur();
            this.$emit('Header:listNameChange');
        }
    }
    
    openMainPage() {
        location.hash = '';
    }
    
    deleteExcel() {
        this.store.delete();
        location.hash = '';
    }
    
    toHTML() {
        return `
            <input type="text" class="input" value="${this.listName}" data-event_keyup="listNameChange"/>
            <div>
                <div class="button">
                    <i class="material-icons" data-event_click="deleteExcel">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons" data-event_click="openMainPage">exit_to_app</i>
                </div>
            </div>
        `;
    }
}
