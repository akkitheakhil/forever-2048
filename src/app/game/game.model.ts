export interface GameBoardConfigs {
    gridSize: number;
    cellSize: number;
    gap: number;
}

export interface GameCell {
    x: number;
    y: number;
    tile?: GameTile;
}

export interface GameTile {
    x?: number;
    y?: number;
    value?: number;
    remove?: Function;
}