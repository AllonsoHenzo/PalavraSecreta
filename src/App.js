import logo from './logo.svg';
import './App.css';
//Use
import { useCallback, useEffect, useState } from 'react';
//Palavras
import {wordsList} from "./data/words"
//Componentes 
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import End from './Components/End';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const[gameStage, setGameStage] = useState(stages[0].name);
  const[words] = useState(wordsList);

  const[pickedWord, setPickedWord] = useState("")
  const[pickedCategory, setPickedCategory] = useState("")
  const[letters, setLetters] = useState([])

  const pickWC = () => {
    //Pegando categoria aleatória 
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length )];

    console.log(category);

    //Pegando palavra aleatoria 
    const word = words[category][Math.floor(Math.random() * words[category].length )];
    console.log(word);

    return {word, category}
  }

  //Começando o game
  const startGame = () => {
    //Pegando palavras
    const {word, category} = pickWC();
    
    //Transformando palavra em letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((letters) => letters.toLowerCase());

    console.log(wordLetters)

    //States
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);

    setGameStage(stages[1].name);
  }

  // Processo de letras no input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  // Restarta o game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <End retry={retry}/>}
    </div>
  );
}

export default App;
