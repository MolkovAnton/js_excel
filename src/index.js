import './sccs/index.scss';
import {Router} from '@/core/Router/Router';
import {RoutesMap} from '@/core/Router/RoutesMap';

new Router('#app', RoutesMap.routes);
