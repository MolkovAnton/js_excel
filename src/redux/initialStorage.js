export function initialStorage(id) {
    const defaultStorage = {
        cells: {},
        colState: {},
        rowState: {},
        curText: '',
        listName: 'Новая таблица',
        date: new Date().toLocaleString(),
        id: id
    };
    const storage = JSON.parse(localStorage.getItem(id)) || defaultStorage;
    for (let type in defaultStorage) {
        if (!storage[type]) {
            storage[type] = defaultStorage[type];
        }
    }

    return storage;
}

export function makeExcelId(id = Date.now().toString()) {
    return 'Excel_storage:' + id;
}