export default function heavyLoad(n: number) {
  console.log('heavyLoad', n);
  return new Array(n).fill(0).map((_, i) => i).reduce((acc, i) => acc + i, 0);
}

// export default class MCTSWorker {
//   // constructor() {}

//   async search() {
//     return 10;
//   }

// }
