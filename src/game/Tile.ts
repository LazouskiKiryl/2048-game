class Tile {
  private static nextId: number = 0;

  private _id: number;
  private _value: number;

  constructor(value: number = 2) {
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

export { Tile };
