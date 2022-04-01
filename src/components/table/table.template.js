const CODES = {
    A: 65,
    Z: 90
};
function toChar(i) {
    return String.fromCharCode(CODES.A + i)
}
function createCell(content = '', column = '', row = '') {
    return `
        <div class="row__cell" contenteditable data-column="${column}" data-row="${row}">${content}</div>
    `;
}
function createColumn(content = '') {
    return `
        <div class="row__column" data-type="resizeble" data-column="${content}">
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
            columns.push(createCell('', toChar(i), number));
        } else {
            columns.push(createColumn(toChar(i)));
        }
    }
    const resizer = number ? `<div class="row-resize" data-event_mousedown="rowResize"></div>` : '';
    return `
        <div class="row" data-type="resizeble">
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
