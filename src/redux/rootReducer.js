import * as types from '@/redux/types';

export function rootReducer(state, action) {
    const date = {date: new Date().toLocaleString()};
    switch (action.type) {
        case types.TABLE_RESIZE:
            const resazeType = action.data.type === 'column' ? 'colState' : 'rowState';
            return {...state, [resazeType]: value(state, resazeType, action), ...date};
        case types.CELL_CHANGE:
            return {...state, cells: value(state, 'cells', action), ...date};
        case types.LIST_NAME_CHANGE:
            return {...state, listName: action.text, ...date};
        default:
            return {...state, ...date};
    }
}

function value(state, field, action) {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}