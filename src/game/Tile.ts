type TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;

class Tile {
  private static nextId: number = 0;

  private _id: number;
  private _value: TileValue;

  constructor(value: TileValue = 2) {
    this._id = Tile.nextId++;
    this._value = value;
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
}

export { Tile, type TileValue };
