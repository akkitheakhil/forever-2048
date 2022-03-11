import { Game } from './game/game';
import { Home } from './home/home';


interface routes {
    name: string;
    component: any;
}

class Router {
    root: HTMLElement = document.getElementById('root');

    private static _instance: Router;

    private routes: routes[] = [
        { name: 'home', component: new Home() },
        { name: 'game', component: new Game() },
    ]

    constructor() {
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public routeTo(_page: string): void {
        const page = this.routes.find(route => route.name === _page);
        if (!page) {
            return;
        }
        this.root.innerHTML = '';
        this.root.appendChild(page.component.view());
        page.component.events.bind(page.component)();
    }
}

export const AppRouter = Router.Instance;