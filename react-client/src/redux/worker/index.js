import { wrap } from 'comlink';

// eslint-disable-next-line
import Worker from 'worker-loader!./worker'; // inline loader

export default function WorkerConstructor() {
  return wrap(new Worker());
}
