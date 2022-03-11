import { AppRouter } from '../app.router';
export class Home {

    constructor() {
    }

    public view(): HTMLElement {
        const section: HTMLElement = document.createElement('section');
        section.classList.add('home');
        section.innerHTML = ` 
    <div class="home__container">  
        <h1 class="home__title">2048 FOREVER</h1>  
        
        <div class="home__buttons">
            <button class="home__button home__button--play" data-play-button>PLAY</button>
            <button class="home__button home__button--about" data-about-button>ABOUT</button>
            <button class="home__button home__button--how" data-how-button>HOW TO PLAY</button>
        </div>
    </div>      
    `;
        return section;
    }

    public events(): void {

        const playButton = document.querySelector('[data-play-button]');
        const aboutButton = document.querySelector('[data-about-button]');
        const howButton = document.querySelector('[data-how-button]');

        playButton.addEventListener('click', () => {
            AppRouter.routeTo('game');
        }, { once: true });

        aboutButton.addEventListener('click', () => {
            AppRouter.routeTo('about');
        }, { once: true });

        howButton.addEventListener('click', () => {
            AppRouter.routeTo('how');
        }, { once: true });
    }

}