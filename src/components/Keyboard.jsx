import KeyboardKey from "./KeyboardKey";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Keyboard.css";

function Keyboard() {
  // Store letters that will be used to make the buttons for the keyboard
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  // Gets the array of letters guessed from the Redux store
  const lettersGuessed = useSelector((state) => state.hangman.lettersGuessed);

  // Get the correct answer and state of hasWon/hasLost from the Redux store as
  const answer = useSelector((state) => state.hangman.answer);
  const hasWon = useSelector((state) => state.hangman.hasWon);
  const hasLost = useSelector((state) => state.hangman.hasLost);
  const [gameEnded, setGameEnded] = useState(false);

  /* Function that returns a boolean for whether or not the game has ended or not. 
  This is used to determine if the keyboard needs to be hidden or not */
  const hasGameEnded = () => {
    if (hasWon || hasLost) {
      return true;
    } else {
      return false;
    }
  };

  // Updates the gameEnded when the state of hasWon or hasLost changes so that it re renders
  useEffect(() => {
    // changes the state of gameEnded if hasWon or hasLost changes state
    setGameEnded(hasGameEnded());
  }, [hasWon, hasLost]);

  return (
    // Keyboard hidden if game has ended
    <div className="keyboardContainer" style={{ display: gameEnded && "none" }}>
      {/* Creates a keyboard key for every letter in the letters array */}
      {letters.map((letter) => {
        /* Function used to set the boolean value of whether or not the letter has already 
        been guessed by the user. */
        const checkIfGuessed = () => {
          // Checks if the letter is one of the letters already guessed and returns its index
          const letterIndex = lettersGuessed.indexOf(letter);
          // if it finds the letter in the guessed letters array, it returns true; if not, it returns false
          return letterIndex >= 0;
        };

        // Checks if the letter is/would be correct
        const checkIfCorrect = () => {
          // Checks if the letter is in the answer string
          const answerIndex = answer.indexOf(letter);
          return answerIndex >= 0;
        };

        // Boolean value for if the letter guessed is correct
        const isGuessCorrect = checkIfCorrect();

        /* The boolean value of hasBeenGuessed will be used to determine the class name of the 
         button so that its appearance can be changed if player has already guessed the letter. */
        const hasBeenGuessed = checkIfGuessed();

        return (
          <KeyboardKey
            letter={letter}
            key={letter}
            hasBeenGuessed={hasBeenGuessed}
            correctGuess={isGuessCorrect}
          />
        );
      })}
    </div>
  );
}

export default Keyboard;

// References:

/* I looked through this Stack Overflow post on how to CSS display:none within a conditional
within React JSX: */
// https://stackoverflow.com/questions/37728951/how-to-css-displaynone-within-conditional-with-react-jsx
/* I was struggling to work out the correct syntax to add style=display: none on the <div> tag 
if gameEnded was true. */
// I used <div style={{ display: gameEnded && "none" }}> to hide the keyboard if the game had ended.
