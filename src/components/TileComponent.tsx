import React from 'react';
import styled from 'styled-components';
import { Tile } from '../game/Tile';

type StyledTileProps = {
  row: number;
  col: number;
};

const StyledTileComponent = styled.div<StyledTileProps>`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  top: ${(props) => (100 / 4) * props.row + '%'};
  left: ${(props) => (100 / 4) * props.col + '%'};
  width: 25%;
  height: 25%;
  align-items: center;
  justify-content: center;
  background: #eee4da;
  color: #776e65;
  font-size: 36px;
`;

type TileComponentProps = {
  tile: Tile;
  row: number;
  col: number;
};

const TileComponent: React.FC<TileComponentProps> = ({ tile, row, col }) => {
  return (
    <StyledTileComponent row={row} col={col}>
      {tile.value}
    </StyledTileComponent>
  );
};

export default TileComponent;
