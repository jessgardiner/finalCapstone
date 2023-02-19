import { configureStore } from "@reduxjs/toolkit";
import hangmanReducer from "./hangman";

// Configures store by defining the reducer
export default configureStore({
  reducer: {
    hangman: hangmanReducer,
  },
});
