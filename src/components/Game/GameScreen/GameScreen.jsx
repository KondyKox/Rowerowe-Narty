import { useState, useEffect } from "react";
import UI from "../UI/Navbar/Navbar";
import GameOver from "../UI/GameOver/GameOver";
import GameCanvas from "../GameCanvas/GameCanvas";

const GameScreen = ({ backToMenu }) => {
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || 0
  );

  useEffect(() => {
    if (score > bestScore) {
      localStorage.setItem("bestScore", score);
      setBestScore(score);
    }
  }, [score, bestScore]);

  // Increment score
  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  // Game Over
  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <>
      <UI onClick={backToMenu} score={score} bestScore={bestScore} />
      {isGameOver ? (
        <GameOver score={score} bestScore={bestScore} />
      ) : (
        <GameCanvas gameOver={setGameOver} />
      )}
    </>
  );
};

export default GameScreen;
