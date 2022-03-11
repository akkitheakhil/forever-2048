import { GameTile } from '../game.model';
import { Tile } from './gameTile';

export class Cell {
    private _element: HTMLElement;
    private _x: number;
    private _y: number;
    private _tile: any;
    private _mergeTile: any;

    constructor(cellElement: HTMLElement, x: number, y: number) {
        this._element = cellElement;
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    get tile() {
        return this._tile
    }

    set tile(value: any) {
        this._tile = value;
        if (value == null) return
        this._tile.x = this._x
        this._tile.y = this._y
    }

    get mergeTile() {
        return this._mergeTile
    }

    set mergeTile(value: any) {
        this._mergeTile = value;
        if (value == null) return
        this._mergeTile.x = this._x
        this._mergeTile.y = this._y
    }


    canAccept(tile: GameTile) {
        return (
            this.tile == null ||
            (this.mergeTile == null && this.tile.value === tile.value)
        )
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value
        this.mergeTile.remove();
        this.mergeTile = null;
    }

}