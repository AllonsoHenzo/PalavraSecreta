//import logo from './logo.svg';
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

  const[guessLetters, setGuessLetters] = useState([])
  const[wrongLetters, setWrongLetters] = useState([])
  const[guesses, setGuesses] = useState(5)
  const[score, setScore] = useState(0)

  const pickWC = useCallback(() => {
    //Pegando categoria aleatória 
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length )];

  

    //Pegando palavra aleatoria 
    const word = words[category][Math.floor(Math.random() * words[category].length )];
   

    return {word, category}
  }, [words]);

  //Começando o game
  const startGame = useCallback(() => {
    //limpando letras antigas
    clearLetterStates();

    //Pegando palavras
    const {word, category} = pickWC();
    
    //Transformando palavra em letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((letters) => letters.toLowerCase());

    //States
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWC]);

  // Processo de letras no input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //checando se foi utilizada
    if (
      guessLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    )  {
      return;
    }
    
    //push letras corretas ou não
    if (letters.includes(normalizedLetter)) {
      setGuessLetters((actualGuessLetters) => [
        ...actualGuessLetters, 
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, 
        normalizedLetter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1);
    }

  };

  const clearLetterStates = () => {
    setGuessLetters([]);
    setWrongLetters([]);
  }

//Condição de derrota
  useEffect(() => {

    if(guesses <= 0) {
      //resetar stagios
      clearLetterStates()

      setGameStage(stages[2].name)
    }

  }, [guesses]);

  //Condição de vitoria
  useEffect(() => {
      
    const uniqueLetters = [...new Set(letters)];

    if(guessLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));

      startGame();
    }

  }, [guessLetters, letters, startGame])


  // Restarta o game
  const retry = () => {
    setScore(0);
    setGuesses(5);
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters} 
          guessLetters={guessLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
      />}
      {gameStage === 'end' && <End retry={retry} score={score}/>}
    </div>
  );
}

export default App;
