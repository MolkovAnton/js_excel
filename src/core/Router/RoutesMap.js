import {DashboardPage} from '@/pages/DashboardPage'
import {ExcelPage} from '@/pages/ExcelPage'

export class RoutesMap {
    static get routes() {
        const routes = {
            default: DashboardPage,
            dashboard: DashboardPage,
            excel: ExcelPage
        };
        
        return routes;
    }
}