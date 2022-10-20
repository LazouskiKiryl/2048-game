type TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;

class Tile {
  private static nextId: number = 0;

  private _id: number;
  private _value: TileValue;
  private _row: number;
  private _col: number;

  constructor(value: TileValue = 2, row: number, col: number) {
    this._id = Tile.nextId++;
    this._value = value;
    this._row = row;
    this._col = col;
  }

  double() {
    this._value *= 2;
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  get row() {
    return this._row;
  }

  set row(row: number) {
    this._row = row;
  }

  get col() {
    return this._col;
  }

  set col(col: number) {
    this._col = col;
  }
}

export { Tile, type TileValue };
