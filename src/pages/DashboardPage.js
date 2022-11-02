import {Page} from '@core/Page'
import {$} from '@core/dom'
import {initialStorage} from '@/redux/initialStorage'

export class DashboardPage extends Page {
    getRoot() {
        const id = Date.now().toString();
        
        return $.create('div', 'db').html(`
            <div class="db__header">
                <h1>Excel dashboard</h1>
            </div>
            <div class="db__new">
                <div class="db__view">
                    <a href="#excel/${id}" class="db__create">Новая таблица</a>
                </div>
            </div>
            <div class="db__table db__view">
                ${this.getRecords()}
            </div>
        `);
    }
    
    getRecords() {
        let html = `
            <div class="db__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>
        `;
        let records = '';
        for (let record in localStorage) {
            const id = record.split(':');
            if (id[0] === 'Excel_storage' && id[1]) {
                const data = JSON.parse(localStorage.getItem(record));
                records += `
                    <li class="db__record">
                        <a href="#excel/${id[1]}">${data.listName}</a>
                        <strong>${data.date}</strong>
                    </li>
                `;
            }
        }
        
        if (records) {
            html += `
                <ul class="db__list">
                    ${records}
                </ul>
            `;
            return html;
        }
        
        return `<p>Не создано ни одной таблицы</p>`;
    }
}