import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';

export class Formula extends ExcelComponent {
    static className = 'excell__formula'
    componentName = 'Formula'
    
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }
    init() {
        super.init();
        this.formulaInput = $(this.$root.find('.input'));
        this.$on('Table:currentTextChange', (text) => {
            this.formulaInput.text(text);
        });
    }
    toHTML() {
        const template = document.createElement('template');
        template.innerHTML = '<div class="info">fx</div><div class="input" contenteditable spellcheck="false" data-event_keydown="formulaEnter"></div>';
        return template.innerHTML;
    }
    onInput(event) {
        this.$emit('Formula:currentTextChange', $(event.target).text());
    }
    onKeydown(event) {
        this.activateEvent(event);
    }
    formulaEnter(event) {
        if (event.key === 'Enter') {
            this.$emit('Formula:enter', 'enter');
        }
    }
}
