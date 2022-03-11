import { GameBoardConfigs } from '../game.model';
import { Cell } from './gameCell';
import { Tile } from './gameTile';


export class GameGrid {

    private _gameContainer: HTMLElement;
    private _gameGrid: HTMLElement;
    private _gameBoardConfigs: GameBoardConfigs;

    private _gameCells: any;

    constructor(gameContainer: HTMLElement, gameGrid: HTMLElement, gameBoardConfigs: GameBoardConfigs) {
        this._gameContainer = gameContainer;
        this._gameGrid = gameGrid;
        this._gameBoardConfigs = gameBoardConfigs;
        this._gameGrid.style.setProperty("--grid-size", this._gameBoardConfigs.gridSize.toString());
        this._gameGrid.style.setProperty("--cell-size", `${this._gameBoardConfigs.cellSize}vmin`);
        this._gameGrid.style.setProperty("--cell-gap", `${this._gameBoardConfigs.gap}vmin`);
        this._gameStart();
    }

    get cells() {
        return this._gameCells;
    }

    get cellsByRow() {
        return this._gameCells.reduce((cellGrid: any, cell: any) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, [])
    }

    get cellsByColumn() {
        return this._gameCells.reduce((cellGrid: any, cell: any) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, [])
    }

    get _emptyCells() {
        return this._gameCells.filter((cell: any) => cell.tile == null);
    }

    public randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this._emptyCells.length);
        return this._emptyCells[randomIndex];
    }

    private _gameStart(): void {
        const GRID_SIZE = this._gameBoardConfigs.gridSize;

        this._gameCells = this._createCells(this._gameGrid, GRID_SIZE).map((cellElement, index) => {
            return new Cell(
                cellElement,
                index % GRID_SIZE,
                Math.floor(index / GRID_SIZE)
            )
        });

        this.randomEmptyCell().tile = new Tile(this._gameGrid)
        this.randomEmptyCell().tile = new Tile(this._gameGrid)
    }

    private _createCells(gridElement: HTMLElement, GRID_SIZE: number): Array<HTMLElement> {
        const cells = []
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cells.push(cell);
            gridElement.append(cell);
        }
        return cells;
    }

}