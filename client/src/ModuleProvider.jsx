import React, { useState } from "react";


const ModuleContext = React.createContext();


function ModuleProvider({ children }) {
  const [Module, setModule] = useState();

  return (
    <ModuleContext.Provider value={{ Module }}>
      {children}
    </ModuleContext.Provider>
  );
}

export default ModuleProvider;