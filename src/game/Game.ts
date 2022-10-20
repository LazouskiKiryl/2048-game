import { fillToLength, findIndexes } from '../utils/array';
import { randomInteger } from '../utils/number';
import { Tile } from './Tile';

const DEFAULT_SIZE = 4;

type CellType = Tile | null;
type TilesType = CellType[][];
type LineName = 'row' | 'col';
type SideLine = 'start' | 'end';

class Game {
  private _size: number;
  private _score: number = 0;
  private _gameOver: boolean = false;
  private _tiles: TilesType = [];

  constructor(size: number = DEFAULT_SIZE) {
    this._size = size;
    this.startNew();

    this.moveLine = this.moveLine.bind(this);
    this.canMoveLeftRow = this.canMoveLeftRow.bind(this);
  }

  startNew(): void {
    this._score = 0;
    this.initTiles();
    this.createRandomTile();
    this.createRandomTile();
  }

  moveLeft(): void {
    if (!this._gameOver && this.canMoveLeft()) {
      this.replaceRowsOfTiles((line) => this.moveLine(line, 'row', 'start'));
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  moveUp(): void {
    if (!this._gameOver && this.canMoveUp()) {
      this.replaceColsOfTiles((line) => this.moveLine(line, 'col', 'start'));
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  moveRight(): void {
    if (!this._gameOver && this.canMoveRight()) {
      this.replaceRowsOfTiles((line) => this.moveLine(line, 'row', 'end'));
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  moveDown(): void {
    if (!this._gameOver && this.canMoveDown()) {
      this.replaceColsOfTiles((line) => this.moveLine(line, 'col', 'end'));
      this.createRandomTile();
      this.checkGameOver();
    }
  }

  get size(): number {
    return this._size;
  }

  get score(): number {
    return this._score;
  }

  get tiles(): Tile[] {
    const result: Tile[] = [];

    this._tiles.forEach((row) =>
      row.forEach((tile) => {
        if (tile) {
          result.push(tile);
        }
      })
    );

    return result;
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
    const tile = new Tile(tileValue, randomRowIndex, randomColIndex);

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

  private canMoveLeft(): boolean {
    return this.checkRowsOfTiles(this.canMoveLeftRow);
  }

  private canMoveUp(): boolean {
    return this.checkColsOfTiles(this.canMoveLeftRow);
  }

  private canMoveRight(): boolean {
    return this.checkRowsOfTiles((row) => this.canMoveLeftRow(row.reverse()));
  }

  private canMoveDown(): boolean {
    return this.checkColsOfTiles((col) => this.canMoveLeftRow(col.reverse()));
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

  private moveLine(line: CellType[], lineName: LineName, moveTo: SideLine): CellType[] {
    let result: CellType[] = [];
    const copiedLine = [...line];

    const changeableLineName = lineName === 'row' ? 'col' : 'row';

    if (moveTo === 'end') {
      copiedLine.reverse();
    }

    let currentIndex = moveTo === 'start' ? 0 : line.length - 1;
    const nextIndex = (index: number) => (moveTo === 'start' ? index + 1 : index - 1);

    let lastTile: CellType = null;

    copiedLine.forEach((tile) => {
      if (tile === null) return;

      if (lastTile !== null && lastTile.value === tile.value) {
        lastTile.double();
        lastTile = null;
      } else {
        tile[changeableLineName] = currentIndex;
        result.push(tile);
        currentIndex = nextIndex(currentIndex);
        lastTile = tile;
      }
    });

    result = fillToLength(result, line.length, null);

    if (moveTo === 'end') {
      result.reverse();
    }

    return result;
  }
}

export { Game, type TilesType };
