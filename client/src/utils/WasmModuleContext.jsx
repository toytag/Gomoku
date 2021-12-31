import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';

import createWasmModule from './WasmModule';

const WasmModuleContext = React.createContext(null);

export const useWasmModule = () => useContext(WasmModuleContext);
export function WasmModuleProvider({ children }) {
  const [wasmModule, setWasmModule] = useState(null);
  // update boardcast
  const [sigUpdate, setSigUpdate] = useState(0);
  // pvp for player vs player, pvc for player vs computer
  const [mode, setMode] = useState('pvp');

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
    sigUpdate,
    sendSigUpdate: () => setSigUpdate((sigUpdate_) => sigUpdate_ + 1),
    mode,
    setMode,
  }), [wasmModule, sigUpdate, mode]);

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
