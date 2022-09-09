import React from 'react';
import styled from 'styled-components';
import { TilesType } from '../game/Game';
import TileComponent from './TileComponent';

const WIDTH = '300px';

const StyledBoard = styled.div`
  position: relative;
  width: ${WIDTH};
  height: ${WIDTH};
  margin: 0 auto;
  background: #bbada0;
`;

type BoardProps = {
  tiles: TilesType;
};

const Board: React.FC<BoardProps> = ({ tiles }) => {
  return (
    <StyledBoard>
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
