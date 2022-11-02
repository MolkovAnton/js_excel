import * as types from '@/redux/types'

export function tableResaze(data) {
    return {
        type: types.TABLE_RESIZE,
        data
    }
}

export function cellChange(data) {
    return {
        type: types.CELL_CHANGE,
        data
    }
}

export function listNameChange(text) {
    return {
        type: types.LIST_NAME_CHANGE,
        text
    }
}
