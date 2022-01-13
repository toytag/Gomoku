import { Move } from '../GomokuCore';

export default class MoveMap<V> extends Map<any, V> {
  set(key: Move, value: V): this {
    return super.set(key.toString(), value);
  }

  get(key: Move): V | undefined {
    return super.get(key.toString());
  }

  has(key: Move): boolean {
    return super.has(key.toString());
  }

  delete(key: Move): boolean {
    return super.delete(key.toString());
  }
}