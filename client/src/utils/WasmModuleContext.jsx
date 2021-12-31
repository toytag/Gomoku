import React, { useContext, useEffect, useMemo, useState } from 'react';

import createWasmModule from './WasmModule';

const WasmModuleContext = React.createContext(null);

export const useWasmModule = () => useContext(WasmModuleContext);
export function WasmModuleProvider({ mode, children }) {
  const [wasmModule, setWasmModule] = useState(null);
  const [sigUpdate, setSigUpdate] = useState(0);

  useEffect(() => {
    createWasmModule({ noInitialRun: true, noExitRuntime: true })
      .then((module_) => {
        setWasmModule({
          ...module_,
          instance: new module_.GomokuCore(),
        });
      });
  }, []);

  // solution offered by react/jsx-no-constructed-context-values
  const value = useMemo(() => ({
    wasmModule,
    mode,
    sigUpdate,
    sendSigUpdate: () => setSigUpdate((sigUpdate_) => sigUpdate_ + 1),
  }), [wasmModule, sigUpdate]);

  return (
    wasmModule && (
      <WasmModuleContext.Provider
        value={value}
      >
        {children}
      </WasmModuleContext.Provider>
    )
  );
}
