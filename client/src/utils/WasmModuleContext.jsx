import React, { useContext, useEffect, useState } from 'react';

import createWasmModule from './WasmModule';

const WasmModuleContext = React.createContext(null);

export const useWasmModule = () => useContext(WasmModuleContext);
export function WasmModuleProvider({ mode, children }) {
  const [wasmModule, setWasmModule] = useState(null);

  useEffect(() => {
    createWasmModule({ noInitialRun: true, noExitRuntime: true })
      .then((module_) => {
        setWasmModule({
          ...module_,
          mode,
          instance: new module_.GomokuCore(),
        });
      });
  }, []);

  return (
    wasmModule && (
      <WasmModuleContext.Provider value={wasmModule}>
        {children}
      </WasmModuleContext.Provider>
    )
  );
}
