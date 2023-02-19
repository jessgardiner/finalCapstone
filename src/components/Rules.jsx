import { useDispatch } from "react-redux";
import { showRules } from "../store/hangman";
import "./Rules.css";

function Rules() {
  const dispatch = useDispatch();
  return (
    <div className="rules">
      <header>
        {/* When 'back' button is clicked, showRules is set back to false and the rules are hidden again */}
        <button
          className="btn"
          onClick={() => dispatch(showRules({ showRules: false }))}
        >
          Back
        </button>
      </header>

      <h2>Hangman Instructions and Rules</h2>

      <p>
        Hangman is a single-player game to guess a random word correctly by
        guessing letters.
      </p>
      <section>
        <h3>1. How to play:</h3>
        <ul>
          <li>
            Click on any letter button to start guessing a letter and start the
            game.
          </li>
          <li>
            If you want to choose a different word to guess (e.g. it's too
            long), click 'Change word'.
          </li>
          <li>
            The word to be guessed is displayed above the keyboard. Its letters
            are represented with underscores at the start of the game or if not
            yet guessed correctly.
          </li>
          <li>
            If you make a correct guess, the correct letter(s) are revealed in
            the word display. The number of guesses remaining will stay the
            same.
          </li>
          <li>
            Dashes or spaces do not need to be guessed and are already visible
            in the word display.
          </li>
          <li>
            However, every time you make an incorrect guess, you are one step
            closer to the man being hanged! You will notice your 'incorrect
            guesses remaining' count go down.
          </li>
        </ul>
      </section>
      <section>
        <h3>2. HOW TO WIN</h3>
        <ul>
          <li>
            Win by guessing all the letters in the word within 9 or less
            incorrect guesses.
          </li>
          <li>
            When you have guessed the whole word, the game will end and you will
            see a 'You won!' message
          </li>
          <li>
            If you didn't guess the word within the number of incorrect guesses
            allowed, you will see a 'You lose' message and the correct answer.
          </li>
          <li>Once the game has ended, click 'Restart game' to play again.</li>
        </ul>
      </section>
    </div>
  );
}

export default Rules;
