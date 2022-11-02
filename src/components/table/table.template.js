const CODES = {
    A: 65,
    Z: 90
};
function toChar(i) {
    return String.fromCharCode(CODES.A + i)
}
function createCell(content = '', column = '', row = '') {
    return `
        <div class="row__cell" contenteditable data-column="${column}" data-row="${row}" 
        data-event_mousedown="selectCell" data-event_mouseup="selectCellGroup" data-event_keydown="navigateCell" data-event_keyup="cellChange">
            ${content}
        </div>
    `;
}
function createColumn(content = '', i) {
    return `
        <div class="row__column" data-type="resizeble" data-column="${i}">
            ${content}
            <div class="colum-resize" data-event_mousedown="columnResize"></div>
        </div>
    `;
}
function createRow(number = '') {
    const columnsCount = CODES.Z - CODES.A;
    const columns = [];
    for (let i = 0; i <= columnsCount; i++) {
        if (number) {
            columns.push(createCell('', i+1, number));
        } else {
            columns.push(createColumn(toChar(i), i+1));
        }
    }
    const resizer = number ? `<div class="row-resize" data-event_mousedown="rowResize"></div>` : '';
    return `
        <div class="row" data-type="resizeble" data-row="${number}">
            <div class="row__info">${number}${resizer}</div>
            <div class="row__data">${columns.join('')}</div>
        </div>
    `;
}
export function createTable(rowsCount = 40) {
    const rows = [];
    rows.push(createRow());
    for (let i = 1; i <= rowsCount; i++) {
        rows.push(createRow(i));
    }
    
    return rows.join('');
}
