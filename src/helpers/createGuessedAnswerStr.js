/* Function returns a string that displays any letters they have been 
guessed correctly in the correct position, or blank underscores
if letter hasn't been guessed yet. Spaces are added between each character. */
export const createGuessedAnswerStr = (answer, correctIndices) => {
  // Split characters in 'answer' string to an array in order to easily apply the .map() method
  let answerArr = answer.split("");

  /* Create new array with characters that are either the character in the answer (if guessed
    correctly or is a space/dash, or an underscore if not yet guessed correctly) using .map() method */
  let guessedAnswerArr = answerArr.map((char, i) => {
    /* If the current index (i) matches one of the numbers in the
        correctIndices array, or is a dash or space */
    if (correctIndices.indexOf(i) >= 0 || char === "-" || char === " ") {
      // add the letter (or dash/space) to the display array
      return char;
      // if the index (i) is not in the correctIndices array
    } else {
      // Add an underscore to the array instead
      return "_";
    }
  });
  // Return string of guessedAnswerArr
  return guessedAnswerArr.join("");
};
