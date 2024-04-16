import logo from './logo.svg';
import './App.css';
import StartScreen from './Components/StartScreen';
import { useCallback, useEffect, useState } from 'react';
import {wordsList} from "./data/words"



function App() {
  return (
    <div className="App">
      <StartScreen />
    </div>
  );
}

export default App;
