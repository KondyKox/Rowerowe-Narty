import "./GameOver.css";

const GameOver = ({ score, bestScore }) => {
  return (
    <div className="game-over">
      <h1>YOU NOOB!</h1>
      <div className="game-over__scores">
        <p className="game-over__score">
          Score: <span className="score">{score}</span>
        </p>
        <p className="game-over__best-score">
          Best Score: <span className="best-score">{bestScore}</span>
        </p>
      </div>
      <p>
        Click to <span className="play-again">play again</span>.
      </p>
    </div>
  );
};

export default GameOver;
