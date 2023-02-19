import { createSlice } from "@reduxjs/toolkit";
import { createGuessedAnswerStr } from "../helpers/createGuessedAnswerStr";
import { wordList } from "../helpers/wordList";

// Dictionary is an array of words from the wordList.js file (modified from dictionary.txt file provided for the task)
const dictionary = wordList;

// Function to get a random word from the dictionary in lower case
const getRandomWord = (arr) => {
  // Get a random index value between 0 - length of the array
  let randomIndex = Math.floor(Math.random() * arr.length);
  // Set the answer using the random index and put it into lower case
  let answer = arr[randomIndex].toLowerCase();
  return answer;
};

const answer = getRandomWord(dictionary);

// Variable that stores the initial state
const initialHangmanState = {
  guessesUsed: 0,
  guessesRemaining: 10,
  answer: answer,
  // Creates the guessed answer string (with underscores for each letter of the answer)
  guessedAnswer: createGuessedAnswerStr(answer, []),
  hasWon: false,
  hasLost: false,
  lettersGuessed: [],
  correctlyGuessedPositions: [],
  showRules: false,
};

// Creates a slice of state in the redux store.
export const hangmanSlice = createSlice({
  name: "hangman",
  // Initial state is set to the initialHangmanState declared above
  initialState: initialHangmanState,

  // Here are the reducers(which will also be the actions) for the game
  reducers: {
    // Triggers when a keyboard key is pressed
    guessLetter: (state, action) => {
      const letter = action.payload.letter;
      const isGuessCorrect = action.payload.isGuessCorrect;
      const answer = state.answer;
      const correctIndices = state.correctlyGuessedPositions;

      // Add letter to letters guessed array in Redux store
      state.lettersGuessed.push(letter);

      // If the letter was a correct guess
      if (isGuessCorrect) {
        /* add the index/ indices of all instances of the letter to the 
        correctlyGuessedPositions array in the Redux state store */
        for (let i = 0; i < answer.length; i++) {
          if (letter === answer[i]) {
            state.correctlyGuessedPositions.push(i);
          }
        }
      }
      // Else if guess was incorrect, increment/decrement guesses remaining/ guesses used in state store
      else {
        state.guessesUsed++;
        state.guessesRemaining--;
      }

      // Update guessedAnswer in the state:
      // Build an updated guessedAnswer string
      let guessedAnswerStr = createGuessedAnswerStr(answer, correctIndices);
      //  update the value of guessedAnswer in state
      state.guessedAnswer = guessedAnswerStr;

      // Check if player has won:
      // Compare the 'answer' and 'guessedAnswer' strings in the store
      /* If answer and guessedAnswer match and the player has used 9 or less
      guesses */
      if (state.answer === state.guessedAnswer && state.guessesUsed <= 9) {
        // set boolean of 'hasWon' to true
        state.hasWon = true;
      }

      // Check if player has lost:
      // If player has used all 10 guesses and hasWon is set to false
      if (state.guessesUsed === 10 && state.hasWon === false) {
        // set the hasLost state to true
        state.hasLost = true;
      }
    },

    /* For when the restart game button is clicked - resets to initial state
    and gets a new random word from the dictionary and then updates the 
    corresponding guessed word value */

    resetValues: (state) => {
      // Creates an array of all the keys and iterates through each key of the initial state
      Object.keys(initialHangmanState).forEach((key) => {
        // Generate a new random word for the answer key
        if (key === "answer") {
          state[key] = getRandomWord(dictionary);
        }
        // Update the guessed word (underscores) based on the new answer key
        else if (key === "guessedAnswer") {
          state[key] = createGuessedAnswerStr(state.answer, []);
          // for all the other keys
        } else {
          // copy value across to the state so that it goes back to the initial value
          state[key] = initialHangmanState[key];
        }
      });
    },

    // The payload is a boolean from the action. Sets the show rules state to either true or false
    showRules: (state, action) => {
      state.showRules = action.payload.showRules;
    },
  },
});

export const { guessLetter, resetValues, showRules } = hangmanSlice.actions;

export default hangmanSlice.reducer;

// References:
// I read through the code in this guide to getting a random item from an array:
// https://www.programiz.com/javascript/examples/get-random-item
// I wanted to get a random item from the dictionary array
// I generated a random number for the index, between 0 - array length using Math.random() and Math.floor() to round
