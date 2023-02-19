import { useSelector, useDispatch } from "react-redux";
import { resetValues, showRules } from "../store/hangman";
import "./InfoMenu.css";

function InfoMenu() {
  const dispatch = useDispatch();
  // Get the current state of items I need from Redux store
  const guessesUsed = useSelector((state) => state.hangman.guessesUsed);
  const guessesRemaining = useSelector(
    (state) => state.hangman.guessesRemaining
  );
  const lettersGuessed = useSelector((state) => state.hangman.lettersGuessed);
  const hasWon = useSelector((state) => state.hangman.hasWon);
  const hasLost = useSelector((state) => state.hangman.hasLost);
  const answer = useSelector((state) => state.hangman.answer);

  // Returns the information on guesses and restart/ help button on the right hand side
  return (
    <div className="infoMenu">
      {/* If start of new game and no guesses made yet */}
      {lettersGuessed.length === 0 && (
        <p className="bold startGuessing removeTopMargin">
          Click a letter key to start guessing!
        </p>
      )}
      {/* If hasWon is true, return the You won! in a <p> element */}
      {hasWon && <p className="bold won">You won!</p>}
      {/* If hasLost is true, return a 'You lost! in a <p> element */}
      {hasLost && (
        <div>
          <p className="bold lost">You lost &#128577;</p>
          <p className="lostAnswer">
            The correct answer is <span className="bold">{answer}</span>
          </p>
        </div>
      )}
      {/* Guesses display is hidden until a letter is guessed */}
      <div
        className={`guessesDisplay ${
          lettersGuessed.length === 0 || guessesUsed === 10 ? "hide" : ""
        }`}
      >
        <p>
          Incorrect guesses: <span className="bold">{guessesUsed}</span>
        </p>
        <p>
          Incorrect guesses remaining:{" "}
          <span className="bold">{guessesRemaining}</span>
        </p>
      </div>
      {/* Letters guessed display is hidden until a letter is guessed */}
      <div
        className={`guessesDisplay ${
          lettersGuessed.length === 0 || guessesUsed === 10 ? "hide" : ""
        }`}
      >
        <p className="removeTopMargin">Letters guessed:</p>
        <p className="bold">{lettersGuessed.join(", ")}</p>
      </div>
      {/* Resets the initial state values on click */}
      <div className="restartHelpContainer">
        <button
          type="button"
          className="btn"
          onClick={() => dispatch(resetValues())}
        >
          {lettersGuessed.length === 0 ? "Change word" : "Restart game"}
        </button>
        {/* When the 'Help' button is pressed, showRules is set to true and rules are displayed */}
        <button
          type="button"
          className="btn"
          onClick={() => dispatch(showRules({ showRules: true }))}
        >
          Help
        </button>
      </div>
    </div>
  );
}

export default InfoMenu;

// References:
// I read through this guide on how to make HTML hyperlinks using the HREF attribute on tags:
// https://www.freecodecamp.org/news/html-button-link-code-examples-how-to-make-html-hyperlinks-using-the-href-attribute-on-tags/
// I was thinking about how to get the 'Help' button (no longer a button but an anchor) to link to the readme file
// I realised it's best to use an anchor rather than a button, and just style the anchor to look like a button instead

// I used this post on Reactgo.com on how to add multiple classes using conditionals in jsx:
// https://reactgo.com/react-multiple-classnames/#:~:text=We%20can%20add%20a%20multiple%20class%20names%20to,div%20element%2C%20otherwise%20class%20name%20is%20removed.%20Example%3A
// I was finding it difficult to get the right syntax with jsx and a ternary operator when adding a second class
// I added a "hide" class on some of the divs, for example, depending on whether no guesses had been made or all guesses were used
