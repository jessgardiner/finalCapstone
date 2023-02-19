import { useDispatch } from "react-redux";
import { guessLetter } from "../store/hangman";
import "./KeyboardKey.css";

function KeyboardKey(props) {
  // Store items passed in props in variables
  const letter = props.letter;
  const hasBeenGuessed = props.hasBeenGuessed;
  const isGuessCorrect = props.correctGuess;
  const dispatch = useDispatch();

  // Handles what to do when the keyboard key is clicked
  const handleClick = () => {
    // Add letter to letters guessed array in Redux store
    dispatch(guessLetter({ letter: letter, isGuessCorrect: isGuessCorrect }));
  };

  // Used to define the class names of the button depending on whether the letter was guessed correctly or incorrectly
  const defineClassNames = () => {
    // If letter has been guessed before and is incorrect, return class name "guessed"
    if (hasBeenGuessed && !isGuessCorrect) {
      return "incorrect";
    }
    // If letter has been guessed before and is correct, return class name "correct"
    else if (hasBeenGuessed && isGuessCorrect) {
      return "correct";
    }
  };

  /* Stores the class name(s) that will be added for the keyboard key so that 
  it can be changed to e.g. green or red depending on whether previous guesses
  were correct or incorrect */
  const classNameBtn = defineClassNames();

  return (
    <button
      type="button"
      /*  Add class names 'guessed' and either 'correct' or 'incorrect' if letter 
      has already been guessed */
      className={classNameBtn}
      onClick={handleClick}
      //  if hasBeenGuessed is true, button will have disabled attribute
      disabled={hasBeenGuessed}
    >
      {letter}
    </button>
  );
}

export default KeyboardKey;

// References:
// I looked at the example of how to use indexOf on the MDN wev docs site:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// I needed to remind myself of the syntax and how the indexOf() method works
// I used it to determine a boolean value of whether the letter has already been guessed or not

// I looked into adding a disabled attribute to a button on w3schools.com:
// https://www.w3schools.com/tags/att_button_disabled.asp#:~:text=The%20disabled%20attribute%20can%20be,make%20the%20button%20clickable%20again.
// I wanted to disable a button after the letter has been guessed
// I learned the syntax of how to add the disabled attribute to an element

/* I looked at this post to see how to add an attribute to a component (a button in
     this case) if a condition is met: */
// https://stackoverflow.com/questions/31163693/how-do-i-conditionally-add-attributes-to-react-components
// I wanted to to add the 'disabled' attribute to the keyboard <button> if  hasBeenGuessed is true
/* I found out that React will omit the attribute if the value you pass is not truthy. 
So i put 'disabled={hasBeenGuessed} in my button element. */
