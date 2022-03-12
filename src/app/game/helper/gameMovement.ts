import { GameGrid } from './gameGrid';
import { Tile } from './gameTile';

export class GameMovement {
    private _grid: GameGrid;
    private _gameBoard: HTMLElement;
    private _callBack: any;

    constructor(gameGrid: GameGrid, gameBoard: HTMLElement, callBack: any) {
        this._grid = gameGrid;
        this._gameBoard = gameBoard;
        this._callBack = callBack;
    }

    public async move(_direction: string) {
        switch (_direction) {
            case "ArrowUp":
                if (!this.canMoveUp()) {
                    return
                }
                await this.moveUp()
                break
            case "ArrowDown":
                if (!this.canMoveDown()) {
                    return
                }
                await this.moveDown()
                break
            case "ArrowLeft":
                if (!this.canMoveLeft()) {
                    return
                }
                await this.moveLeft()
                break
            case "ArrowRight":
                if (!this.canMoveRight()) {
                    return
                }
                await this.moveRight()
                break
            default:
                return
        }

        this._grid.cells.forEach((cell: any) => cell.mergeTiles())

        const newTile = new Tile(this._gameBoard);
        this._grid.randomEmptyCell().tile = newTile;

        if (!this.canMoveUp() && !this.canMoveDown() && !this.canMoveLeft() && !this.canMoveRight()) {
            newTile.waitForTransition(true).then(() => {
                this.gameOver();
            })
            return
        }
    }

    private gameOver() {
        this.removeAllTiles();
        this.setGameOverTiles();
    }

    removeAllTiles() {
        this._grid.cells.forEach((cell: any) => {
            cell.tile = null;
        })
        const tiles = document.querySelectorAll('[data-tile]');
        tiles.forEach((tile: any) => {
            tile.remove();
        });

        return;
    }


    setGameOverTiles() {
        const colorArray = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

        'GAME'.split('').forEach((letter: any, index: number) => {
            const tileElement = document.createElement("div");
            tileElement.setAttribute("data-tile", "");
            tileElement.classList.add("tile");
            tileElement.textContent = letter;
            this._gameBoard.append(tileElement);
            tileElement.style.setProperty("--x", index.toString());
            tileElement.style.setProperty("--y", '1');
            const random = Math.floor(Math.random() * colorArray.length);
            tileElement.classList.add(`tile__${colorArray[random]}`);
        });

        'OVER'.split('').forEach((letter: any, index: number) => {
            const tileElement = document.createElement("div");
            tileElement.setAttribute("data-tile", "");
            tileElement.classList.add("tile");
            tileElement.textContent = letter;
            this._gameBoard.append(tileElement);
            tileElement.style.setProperty("--x", index.toString());
            tileElement.style.setProperty("--y", '2');
            const random = Math.floor(Math.random() * colorArray.length);
            tileElement.classList.add(`tile__${colorArray[random]}`);
        });

        return;
    }

    private moveUp() {
        return this.slideTiles(this._grid.cellsByColumn)
    }

    private moveDown() {
        return this.slideTiles(this._grid.cellsByColumn.map((column: any) => [...column].reverse()))
    }

    private moveLeft() {
        return this.slideTiles(this._grid.cellsByRow)
    }

    private moveRight() {
        return this.slideTiles(this._grid.cellsByRow.map((row: any) => [...row].reverse()))
    }


    private async slideTiles(cells: any) {
        await Promise.all(
            cells.flatMap((group: any) => {
                const promises = []
                for (let i = 1; i < group.length; i++) {
                    const cell = group[i];
                    if (cell.tile == null) continue;
                    let lastValidCell;
                    for (let j = i - 1; j >= 0; j--) {
                        const moveToCell = group[j]
                        if (!moveToCell.canAccept(cell.tile)) break
                        lastValidCell = moveToCell
                    }

                    if (lastValidCell != null) {
                        promises.push(cell.tile.waitForTransition())
                        if (lastValidCell.tile != null) {
                            lastValidCell.mergeTile = cell.tile
                        } else {
                            lastValidCell.tile = cell.tile
                        }
                        cell.tile = null
                    }
                }

                return promises
            })
        )

        const additionalScore = this._grid.cells.reduce((sum: any, cell: any) => {
            if (cell.mergeTile == null || cell.tile == null) return sum
            return sum + cell.mergeTile.value + cell.tile.value
        }, 0)

        this._callBack(additionalScore);
    }

    private canMoveUp() {
        return this._canMove(this._grid.cellsByColumn)
    }

    private canMoveDown() {
        return this._canMove(this._grid.cellsByColumn.map((column: any) => [...column].reverse()))
    }

    private canMoveLeft() {
        return this._canMove(this._grid.cellsByRow)
    }

    private canMoveRight() {
        return this._canMove(this._grid.cellsByRow.map((row: any) => [...row].reverse()))
    }

    private _canMove(cells: any) {
        return cells.some((group: any) => {
            return group.some((cell: any, index: number) => {
                if (index === 0) return false
                if (cell.tile == null) return false
                const moveToCell = group[index - 1]
                return moveToCell.canAccept(cell.tile)
            })
        })
    }


}