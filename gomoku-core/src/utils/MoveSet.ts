import { Move } from '../GomokuCore';

export default class MoveSet extends Set<any> {
  static fromArray(array: Move[]): MoveSet {
    const set = new MoveSet;
    for (let i = 0; i < array.length; i += 1) {
      set.add(array[i]);
    }
    return set;
  }

  add(item: Move): this {
    return super.add(item.toString());
  }

  has(item: Move): boolean {
    return super.has(item.toString());
  }

  delete(item: Move): boolean {
    return super.delete(item.toString());
  }
}