import React, { useContext, useEffect, useState } from 'react';

import createWasmModule from './WasmModule';

const WasmModuleContext = React.createContext(null);

export const useWasmModule = () => useContext(WasmModuleContext);

export function WasmModuleProvider({ children }) {
  const [wasmModule, setWasmModule] = useState(null);

  useEffect(() => {
    // prevent updating unmounted component
    let isSubscribed = true;
    createWasmModule({ noInitialRun: true, noExitRuntime: true })
      .then((module_) => {
        if (isSubscribed) {
          const modifiedModule = module_;
          // webassembly backend
          modifiedModule.backend = new modifiedModule.GomokuCoreWithAgent();
          // used to withdraw a move, reset game, states are defined at Sqaure.jsx
          // need this to get the setter for the square, without causing any rerender
          modifiedModule.board = modifiedModule.backend.get_board();
          // used to determine the winner of the game, states are defined at Control.jsx
          modifiedModule.winner = { winner: modifiedModule.GomokuPiece.EMPTY };
          // used to determine the mode of the game, states are defined at Header.jsx
          modifiedModule.mode = null;
          setWasmModule(modifiedModule);
        }
      });
    return () => { isSubscribed = false; };
  }, []);

  return wasmModule ? (
    <WasmModuleContext.Provider value={wasmModule}>
      {children}
    </WasmModuleContext.Provider>
  ) : null;
}
