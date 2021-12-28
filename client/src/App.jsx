import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import Board from './components/Board';
import ModuleProvider from './ModuleProvider';

function App() {
  return (
    <ModuleProvider children={<Board />} />
  );
}

export default App;
