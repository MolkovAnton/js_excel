import {ExcelComponent} from '@core/ExcelComponent';
export class Formula extends ExcelComponent {
    static className = 'excell__formula'
    componentName = 'Formula'
    
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }
    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }
    onClick(event) {
        console.dir(event);
    }
}
