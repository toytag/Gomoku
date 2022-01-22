const createWasmModule = require('./build/wasm');

createWasmModule({ noInitialRun: true, noExitRuntime: true })
  .then(wasmModule => {
    // console.log(wasmModule);
    let gomoku = new wasmModule.GomokuCoreWithAgent();
    console.log(gomoku.move(1,1).value);
    console.log(gomoku.search());
    console.log(gomoku.withdraw());
    console.log(gomoku.withdraw());
    console.log(gomoku.withdraw());
    console.log(gomoku.withdraw());
    // module.exports = wasmModule;
  });