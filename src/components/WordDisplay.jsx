import { useSelector, useDispatch } from "react-redux";

/* WordDisplay gets the guessed word string from the store, 
puts each character into an array and joins it back into into 
a string with space added inbetween */
function WordDisplay() {
  // Get the current state of the guessed answer
  const guessedAnswer = useSelector((state) => state.hangman.guessedAnswer);
  // Split each character into an array item
  const guessedAnswerSplit = guessedAnswer.split("");
  // Convert the array back into a string with a space between each character
  const displayStr = guessedAnswerSplit.join(" ");

  // Returns the large guessed answer display above the keyboard
  return (
    <div>
      <p className="guessedWord">{displayStr}</p>
    </div>
  );
}

export default WordDisplay;

// References:
/* I looked at the MDN web docs for the array.join() method to understand how to convert an array 
into a string with spaces between the characters:*/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
// I wanted to add spaces between each character for the word display
// I used displayArr.join(" ")
