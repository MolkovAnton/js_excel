import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@/core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {initialStorage, makeExcelId} from '@/redux/initialStorage';

export class ExcelPage extends Page {
    getRoot() {
        const id = this.params.id || Date.now().toString();
        const initStorage = initialStorage(makeExcelId(id));
        const store = createStore(rootReducer, initStorage);
        store.subscribe(state => {
            localStorage.setItem(makeExcelId(id), JSON.stringify(state));
        });

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });
        
        return this.excel.getRoot();
    }
    
    afterRender() {
        this.excel.init();
    }
    
    destroy() {
        this.excel.destroy();
    }
}