import {$} from '@core/dom';

export class TableSelection {
    static classSelected = 'selected';
    
    constructor(table) {
        this.$table = table;
        this.group = [];
        this.current = null;
    }
    select(params) {
        if (!params || !params.target) {
            return;
        }
        
        const row = +params.target.dataset.row;
        const col = +params.target.dataset.column;
        if (!row || !col) {
            return;
        }
        
        if (params.control) {
            params.target.classList.add(TableSelection.classSelected);
            this.group.push($(params.target));
        } else if (params.shift) {
            const curRow = +this.current.data('row');
            const curCol = +this.current.data('column');
            this.selectGroup({
                first: {
                    row: curRow,
                    col: curCol
                },
                second: {
                    row: row,
                    col: col
                }
            });
        } else {
            this.clear();
            params.target.classList.add(TableSelection.classSelected);
            this.group.push($(params.target));
        }
        params.target.focus();
        this.current = $(params.target);
    }
    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.classSelected));
        this.group = [];
    }
    selectGroup(params) {
        this.clear();
        const startRow = params.first.row > params.second.row ? params.second.row : params.first.row;
        const finishRow = params.first.row < params.second.row ? params.second.row : params.first.row;
        const startCol = params.first.col > params.second.col ? params.second.col : params.first.col;
        const finishCol = params.first.col < params.second.col ? params.second.col : params.first.col;

        for (let row = startRow; row <= finishRow; row++) {
            for (let col = startCol; col <= finishCol; col++) {
                const $cell = this.$table.find(`[data-column="${col}"][data-row="${row}"]`);
                $cell.classList.add(TableSelection.classSelected);
                this.group.push($($cell));
            }
        }
    }
    toggleStyle(styles) {
        this.group.forEach($el => {
            for (let style in styles) {
                if (styles[style] === false) {
                    $el.removeClass(style);
                } else {
                    $el.addClass(style);
                }
            }
        });
    }
}
