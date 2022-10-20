import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Tile } from '../game/Tile';
import TileComponent from './TileComponent';

const StyledBoard = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  background: #bbada0;
  border-radius: 6px;
`;

type BoardProps = {
  tiles: Tile[];
  size: number;
};

const Board: React.FC<BoardProps> = ({ tiles, size }) => {
  const [width, setWidth] = useState<number>(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const resize = () => {
    if (boardRef.current) {
      const width = getComputedStyle(boardRef.current).getPropertyValue('width');
      boardRef.current.style.height = width;
      setWidth(parseFloat(width));
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

  const tileElements = tiles.map((tile) => (
    <TileComponent key={tile.id} tile={tile} boardWidth={width} boardSize={size} />
  ));

  return <StyledBoard ref={boardRef}>{tileElements}</StyledBoard>;
};

export default Board;
