import { useSelector } from "react-redux";
import "./Image.css";

function Image() {
  /* Get the current state of guesses used from the store to determine which 
  hangman image to show */
  const guessesUsed = useSelector((state) => state.hangman.guessesUsed);

  // Use the guessesUsed state variable to determine which image should be displayed
  return (
    <div>
      <img
        src={`/images/state${guessesUsed + 1}.GIF`}
        alt={`Hangman guess number${guessesUsed}`}
      />
    </div>
  );
}

export default Image;
