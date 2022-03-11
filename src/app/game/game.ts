import { AppRouter } from '../app.router';
import { GAME_BOARD_CONFIGS } from './game.constants';
import { GameGrid } from './helper/gameGrid';
import { GameInputHandler } from './helper/gameInputHandler';
import { GameMovement } from './helper/gameMovement';

export class Game {

    private _gameGrid: GameGrid;
    private _gameContainerElem: HTMLElement;
    private _movement: GameMovement;
    private _score: number = 0;

    constructor() {
    }

    public view(): HTMLElement {
        const gameSection = document.createElement('section');
        gameSection.classList.add('game');
        gameSection.innerHTML = `
        <div class="game__container">
            <div class="game__container__score">
                <div class="game__container__score__title">Score</div>
                <div class="game__container__score__value" data-game-score-value>0</div>
            </div>

            <div class="game__container__grid">
             
            </div>
            <div class="game__container__buttons">
                <button class="game__container__button game__container__button--back" data-game-back-button>
                BACK
                </button>

                <button class="game__container__button game__container__button--restart" data-game-restart-button>
                RESTART
                </button>
            </div>
        </div>
        `;
        return gameSection;
    }

    public events(): void {
        const backButton = document.querySelector('[data-game-back-button]');
        const restartButton = document.querySelector('[data-game-restart-button]');

        backButton.addEventListener('click', () => {
            AppRouter.routeTo('home');
        }, { once: true });

        restartButton.addEventListener('click', () => {
            this._score = 0;
            AppRouter.routeTo('game');
        }, { once: true });

        this._gameConfig();
    }

    private _gameConfig(): void {
        this._gameContainerElem = document.querySelector('.game__container') as HTMLElement;
        const gameGridElem = document.querySelector('.game__container__grid') as HTMLElement;
        this._gameGrid = new GameGrid(this._gameContainerElem, gameGridElem, GAME_BOARD_CONFIGS);
        const inputHandler = new GameInputHandler(this._handleMovement.bind(this), this._gameContainerElem);
        this._movement = new GameMovement(this._gameGrid, gameGridElem, this._handleScore.bind(this));
        inputHandler.setupInput();
    }

    private _handleMovement(direction: any) {
        this._movement.move(direction);
    }

    private _handleScore(additionalScore: number) {
        this._score = this._score + additionalScore;
        this._showScore();
    }

    private _showScore() {
        const gameScoreValueElem = document.querySelector('[data-game-score-value]') as HTMLElement;
        gameScoreValueElem.textContent = this._score.toString();
    }

}