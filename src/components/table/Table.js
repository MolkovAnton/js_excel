import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {TableSelection} from '@/components/table/TableSelection'
import {toolbarButtons} from '@/components/toolbar/toolbar.buttons';
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
    static className = 'excell__table'
    navigationKeys = ['Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'Enter', 'ArrowDown']
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'mouseup', 'keydown', 'keyup'],
            subscribe: ['cellStyle'],
            ...options
        });
        this.cellSelection = new TableSelection($root);
    }
    toHTML() {
        return createTable();
    }
    init() {
        super.init();
        this.initState();
        const firstCell = this.$root.find(`[data-column="1"][data-row="1"]`);
        this.cellSelection.select({target: firstCell});
        this.$emit('Table:selectCell', this.cellSelection.current.getStyles(Object.keys(toolbarButtons)));
        this.$emit('Table:currentTextChange', this.cellSelection.current.text());
        this.$on('Toolbar:buttonSelect', styles => {
            this.cellSelection.toggleStyle(styles);
            this.cellSelection.group.forEach($el => this.cellChange($el));
        });
        this.$on('Header:listNameChange', () => {
            this.cellSelection.select({target: this.activeElement || firstCell});
        });
        this.$on('Formula:currentTextChange', (text) => {
            this.cellSelection.current.text(text);
            this.cellChange(this.cellSelection.current);
        });
        this.$on('Formula:enter', () => {
            this.navigateCell({
                target: this.cellSelection.current,
                key: 'ArrowDown'
            });
        });
    }
    onMousedown(event) {
        this.activeElement = event.target;
        this.activateEvent(event);
    }
    onMouseup(event) {
        this.activateEvent(event);
    }
    onKeydown(event) {
        this.activateEvent(event);
    }
    onKeyup(event) {
        if (!this.navigationKeys.includes(event.key)) {
            this.activateEvent(event); 
        }
    }
    selectCell(event) {
        this.cellSelection.select({
            target: event.target,
            control: event.ctrlKey,
            shift: event.shiftKey
        });
        this.$emit('Table:selectCell', this.cellSelection.current.getStyles(Object.keys(toolbarButtons)));
        this.$emit('Table:currentTextChange', this.cellSelection.current.text());
    }
    selectCellGroup(event) {
        if (this.activeElement !== event.target) {
            this.cellSelection.select({
                target: event.target,
                shift: true
            });
        } 
    }
    navigateCell(event) {
        const cell = $(event.target);
        if (this.navigationKeys.includes(event.key) && !event.shiftKey) {
            if (typeof event.preventDefault === 'function') {
                event.preventDefault();
            }
            this.cellSelection.select({
                target: this.changeCellByKey(event.key, cell.data('column'), cell.data('row'))
            });
        }
        this.$emit('Table:currentTextChange', this.cellSelection.current.text());
    }
    cellChange(event) {
        const cell = event instanceof KeyboardEvent ? $(event.target) : event;
        const styles = cell.getStyles(Object.keys(toolbarButtons));
        
        const data = {
            value: {
                text: cell.text(),
                column: cell.data('column'),
                row: cell.data('row'),
                style: styles
            },
            id: cell.data('column') + ":" + cell.data('row')
        };
        this.$dispatch(actions.cellChange(data));
    }
    async columnResize(event) {
        try {
            const data = await this.resizeElement('column');
            this.$dispatch(actions.tableResaze(data));
        } catch(e) {
            console.warn(e.message);
        }
    }
    async rowResize(event) {
        try {
            const data = await this.resizeElement('row');
            this.$dispatch(actions.tableResaze(data));
        } catch(e) {
            console.warn(e.message);
        }
    }
    resizeElement(type) {
        return new Promise(resolve => {
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
                let value, id;
                if (type === 'column') {
                    id = this.activeElement.parent.dataset.column;
                    const $cells = this.$root.getElement().querySelectorAll('[data-column="'+id+'"]');
                    value = (event.pageX - coords.left) + 'px';
                    $cells.forEach($cell => {
                        $cell.style.width = value;
                    });
                } else if (type === 'row') {
                    id = this.activeElement.parent.dataset.row;
                    value = (event.pageY - coords.top) + 'px';
                    this.activeElement.parent.style.height = value;
                }

                resolve({value, type, id});
                
                $root.onmousemove = $root.onmouseup = null;
                this.activeElement.classList.remove('active');
                this.activeElement = this.activeElement.style.left = this.activeElement.style.top = this.activeElement.style.height = this.activeElement.style.width = null;
            }
        });
    }
    changeCellByKey(key, col, row) {
        switch (key) {
            case 'Tab':
            case 'ArrowRight':
                col++;
                break;
            case 'ArrowLeft':
                col--;
                break;
            case 'ArrowUp':
                row--;
                break;
            case 'Enter':
            case 'ArrowDown':
                row++;
                break;
        }
        return this.$root.find(`[data-column="${col}"][data-row="${row}"]`);
    }
    initState() {
        const state = this.store.getState();
        const colState = state.colState || {};
        const rowState = state.rowState || {};
        const cellState = state.cells || {};
        
        for (const col in colState) {
            const $columns = this.$root.findAll(`[data-column="${col}"]`);
            $columns.forEach($column => {
                $column.style.width = colState[col];
            });
        }
        
        for (const row in rowState) {
            const $row = this.$root.find(`[data-row="${row}"]`);
            $row.style.height = rowState[row];
        }

        for (const id in cellState) {
            const cell = cellState[id];
            const styles = cell.style || [];
            const $cell = $(this.$root.find(`[data-row="${cell.row}"][data-column="${cell.column}"]`));
            $cell.text(cell.text);
            styles.forEach(style => $cell.addClass(style));
        }
    }
}
