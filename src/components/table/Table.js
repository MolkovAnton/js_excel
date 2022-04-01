import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template'
export class Table extends ExcelComponent {
    static className = 'excell__table'
    
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }
    toHTML() {
        return createTable();
    }
    onMousedown(event) {
        this.activeElement = event.target;
        this.activateEvent(event);
    }
    columnResize() {
        this.resizeElement('column');
    }
    rowResize() {
        this.resizeElement('row');
    }
    resizeElement(type) {
        const $root = this.$root.getElement();
        this.activeElement.classList.add('active');
        this.activeElement.parent = this.activeElement.closest('[data-type="resizeble"]');
        const coords = this.activeElement.parent.getBoundingClientRect();
        
        if (type === 'column') {
            this.activeElement.style.height = $root.clientHeight + 'px';
        } else if (type === 'row') {
            this.activeElement.style.width = $root.clientWidth + 'px';
        }

        $root.onmousemove = event => {
            const resizerCoord = type === 'column' ? event.x - coords.left : event.y - coords.top;
            if (type === 'column') {
                this.activeElement.style.left = resizerCoord > 0 ? resizerCoord + 'px' : 0;
            } else if (type === 'row') {
                this.activeElement.style.top = resizerCoord > 0 ? resizerCoord + 'px' : 0;
            }
        }
        $root.onmouseup = event => {
            if (type === 'column') {
                const $cells = this.$root.getElement().querySelectorAll('[data-column="'+this.activeElement.parent.dataset.column+'"]');
                const cellWidth = (event.pageX - coords.left) + 'px';
                $cells.forEach($cell => {
                    $cell.style.width = cellWidth;
                });
                
            } else if (type === 'row') {
                const rowHeight = (event.pageY - coords.top) + 'px';
                this.activeElement.parent.style.height = rowHeight;
            }
            $root.onmousemove = $root.onmouseup = null;
            this.activeElement.classList.remove('active');
            this.activeElement = this.activeElement.style.left = this.activeElement.style.top = this.activeElement.style.height = this.activeElement.style.width = null;
        }
    }
}
