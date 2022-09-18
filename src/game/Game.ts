import { fillToLength, findIndexes } from '../utils/array';
import { randomInteger } from '../utils/number';
import { Tile } from './Tile';

const DEFAULT_SIZE = 4;

type TilesType = Array<Array<Tile | null>>;

class Game {
  private _size: number;
  private _score: number = 0;
  private _gameOver: boolean = false;
  private _tiles: TilesType = [];

  constructor(size: number = DEFAULT_SIZE) {
    this._size = size;
    this.startNew();

    this.moveLeftRow = this.moveLeftRow.bind(this);
    this.canMoveLeftRow = this.canMoveLeftRow.bind(this);
  }

  startNew(): void {
    this._score = 0;
    this.initTiles();
    this.createRandomTile();
    this.createRandomTile();
  }

  canMoveLeft(): boolean {
    return this.checkRowsOfTiles(this.canMoveLeftRow);
  }

  canMoveUp(): boolean {
    return this.checkColsOfTiles(this.canMoveLeftRow);
  }

  canMoveRight(): boolean {
    return this.checkRowsOfTiles((row) => this.canMoveLeftRow(row.reverse()));
  }

  canMoveDown(): boolean {
    return this.checkColsOfTiles((col) => this.canMoveLeftRow(col.reverse()));
  }

  moveLeft(): void {
    if (!this._gameOver && this.canMoveLeft()) {
      this.replaceRowsOfTiles(this.moveLeftRow);
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  moveUp(): void {
    if (!this._gameOver && this.canMoveUp()) {
      this.replaceColsOfTiles(this.moveLeftRow);
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  moveRight(): void {
    if (!this._gameOver && this.canMoveRight()) {
      this.replaceRowsOfTiles((row) => this.moveLeftRow(row.reverse()).reverse());
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  moveDown(): void {
    if (!this._gameOver && this.canMoveDown()) {
      this.replaceColsOfTiles((col) => this.moveLeftRow(col.reverse()).reverse());
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  get score(): number {
    return this._score;
  }

  get tiles(): TilesType {
    return this._tiles;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  private initTiles(): void {
    this._tiles = new Array(this._size).fill(null).map((_) => new Array(this._size).fill(null));
  }

  private createRandomTile(): void {
    const notFilledRowIndexes = findIndexes(this._tiles, (row) => row.some((tile) => !tile));

    if (!notFilledRowIndexes.length) {
      return;
    }

    const randomRowIndex = notFilledRowIndexes[randomInteger(0, notFilledRowIndexes.length - 1)];
    const randomRow = this._tiles[randomRowIndex];
    const emptyColIndexes = findIndexes(randomRow, (tile) => tile === null);

    const randomColIndex = emptyColIndexes[randomInteger(0, emptyColIndexes.length - 1)];

    const tileValue = Math.random() < 0.8 ? 2 : 4;
    const tile = new Tile(tileValue);

    this._tiles[randomRowIndex][randomColIndex] = tile;
  }

  private checkGameOver(): void {
    const haveEmpty = this._tiles.some((row) => row.some((tile) => !tile));

    if (haveEmpty) return;

    const canMove =
      this.canMoveLeft() || this.canMoveUp() || this.canMoveRight() || this.canMoveDown();

    if (!canMove) {
      this._gameOver = true;
    }
  }

  private checkRowsOfTiles(callback: (row: Array<Tile | null>) => boolean) {
    for (let rowIndex = 0; rowIndex < this._size; rowIndex++) {
      const row = [...this._tiles[rowIndex]];

      if (callback(row)) {
        return true;
      }
    }

    return false;
  }

  private checkColsOfTiles(callback: (col: Array<Tile | null>) => boolean) {
    for (let colIndex = 0; colIndex < this._size; colIndex++) {
      const col = this._tiles.map((row) => row[colIndex]);

      if (callback(col)) {
        return true;
      }
    }

    return false;
  }

  private replaceRowsOfTiles(callback: (row: Array<Tile | null>) => Array<Tile | null>) {
    for (let rowIndex = 0; rowIndex < this._size; rowIndex++) {
      const row = [...this._tiles[rowIndex]];
      const newRow = callback(row);

      for (let colIndex = 0; colIndex < this._size; colIndex++) {
        this._tiles[rowIndex][colIndex] = newRow[colIndex];
      }
    }
  }

  private replaceColsOfTiles(callback: (col: Array<Tile | null>) => Array<Tile | null>) {
    for (let colIndex = 0; colIndex < this._size; colIndex++) {
      const col = this._tiles.map((row) => row[colIndex]);
      const newCol = callback(col);

      for (let rowIndex = 0; rowIndex < this._size; rowIndex++) {
        this._tiles[rowIndex][colIndex] = newCol[rowIndex];
      }
    }
  }

  private canMoveLeftRow(row: Array<Tile | null>): boolean {
    if (row.length < 2) {
      return false;
    }

    for (let rowIndex = 1; rowIndex < row.length; rowIndex++) {
      const previous = row[rowIndex - 1];
      const current = row[rowIndex];

      if (current instanceof Tile && (!previous || previous.value === current.value)) {
        return true;
      }
    }

    return false;
  }

  private moveLeftRow(row: Array<Tile | null>): Array<Tile | null> {
    const movedRow: Array<Tile | null> = [];
    let isDoubleLast = false;

    for (let i = 0; i < row.length; i++) {
      const current = row[i];

      if (!current) continue;

      const isFirstTile = movedRow.length === 0;
      const isEqualPrevious = movedRow[movedRow.length - 1]?.value === current.value;

      if (isFirstTile || !isEqualPrevious || (isEqualPrevious && isDoubleLast)) {
        movedRow.push(current);
        isDoubleLast = false;
      } else if (isEqualPrevious && !isDoubleLast) {
        movedRow[movedRow.length - 1]?.double();
        this._score += Number(movedRow[movedRow.length - 1]?.value);
        isDoubleLast = true;
      }
    }

    return fillToLength(movedRow, row.length, null);
  }
}

export { Game, type TilesType };
