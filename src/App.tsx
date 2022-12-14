import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import { Game } from './game/Game';
import { GlobalStyle } from './style/globalStyles';

const StyledApp = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const game = new Game();

function App() {
  const [tiles, setTiles] = useState(game.tiles);
  const [score, setScore] = useState(game.score);
  const [gameOver, setGameOver] = useState(game.gameOver);

  const updateState = () => {
    setTiles([...game.tiles]);
    setScore(game.score);
    setGameOver(game.gameOver);
  };

  const newGameHandler = () => {
    game.startNew();
    updateState();
  };

  const keyPressHandler = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowLeft':
        game.moveLeft();
        break;
      case 'ArrowUp':
        game.moveUp();
        break;
      case 'ArrowRight':
        game.moveRight();
        break;
      case 'ArrowDown':
        game.moveDown();
        break;
    }

    updateState();
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', keyPressHandler);
    return () => {
      document.removeEventListener('keyup', keyPressHandler);
    };
  }, [keyPressHandler]);

  return (
    <StyledApp>
      <GlobalStyle />
      {gameOver && <h2 style={{ textAlign: 'center', color: 'red' }}>Game over!</h2>}
      <h2 style={{ textAlign: 'center' }}>Score: {score.toString()}</h2>
      <Board tiles={tiles} size={game.size} />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <button onClick={newGameHandler}>New Game</button>
      </div>
    </StyledApp>
  );
}

export default App;
