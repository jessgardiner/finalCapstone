import "./App.css";
import Image from "./components/Image";
import Keyboard from "./components/Keyboard";
import WordDisplay from "./components/WordDisplay";
import InfoMenu from "./components/InfoMenu";
import Rules from "./components/Rules";
import { useSelector } from "react-redux";

// These are the main components that are rendered to creat the hangman game
function App() {
  const showRules = useSelector((state) => state.hangman.showRules);

  return (
    <div className="App">
      <h1>Hangman</h1>
      {/* If show rules is set to false, the following components are displayed */}
      {!showRules && (
        <div>
          <div className="topSection">
            <Image />
            <InfoMenu />
          </div>
          <WordDisplay />
          <Keyboard />
        </div>
      )}
      {/* If showRules is set to true, only the Rules component is displayed */}
      {showRules && (
        <div>
          <Rules></Rules>
        </div>
      )}
    </div>
  );
}

export default App;
