import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TilesType } from '../game/Game';
import TileComponent from './TileComponent';

const StyledBoard = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  background: #bbada0;
  border-radius: 6px;
`;

type BoardProps = {
  tiles: TilesType;
};

const Board: React.FC<BoardProps> = ({ tiles }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const resize = () => {
    if (boardRef.current) {
      const width = getComputedStyle(boardRef.current).getPropertyValue('width');
      boardRef.current.style.height = width;
    }
  };

  const handleResize = useCallback(resize, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(resize, []);

  return (
    <StyledBoard ref={boardRef}>
      {tiles.map((row, rowIndex) =>
        row.map(
          (tile, colIndex) =>
            tile && <TileComponent key={tile.id} tile={tile} row={rowIndex} col={colIndex} />
        )
      )}
    </StyledBoard>
  );
};

export default Board;
