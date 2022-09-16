import React from 'react';
import styled from 'styled-components';
import { boardGap } from '../constants/board';
import { Tile, TileValue } from '../game/Tile';

const styles: { [key in TileValue]: { background: string; color: string; fontSize: number } } = {
  2: { background: '#eee4da', color: '#776e65', fontSize: 55 },
  4: { background: '#eee1c9', color: '#776e65', fontSize: 55 },
  8: { background: '#f3b27a', color: '#f9f6f2', fontSize: 55 },
  16: { background: '#f69664', color: '#f9f6f2', fontSize: 55 },
  32: { background: '#f77c5f', color: '#f9f6f2', fontSize: 55 },
  64: { background: '#f75f3b', color: '#f9f6f2', fontSize: 55 },
  128: { background: '#edd073', color: '#f9f6f2', fontSize: 45 },
  256: { background: '#edcc62', color: '#f9f6f2', fontSize: 45 },
  512: { background: '#edc950', color: '#f9f6f2', fontSize: 45 },
  1024: { background: '#edc53f', color: '#f9f6f2', fontSize: 35 },
  2048: { background: '#edc22e', color: '#f9f6f2', fontSize: 35 },
  4096: { background: '#3c3a33', color: '#f9f6f2', fontSize: 30 },
  8192: { background: '#3c3a33', color: '#f9f6f2', fontSize: 30 },
};

type StyledTileProps = {
  value: TileValue;
  row: number;
  col: number;
  width: number;
};

const StyledTileComponent = styled.div<StyledTileProps>`
  box-sizing: border-box;
  position: absolute;
  top: ${(props) => (props.width + boardGap) * props.row}px;
  left: ${(props) => (props.width + boardGap) * props.col}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  margin: ${boardGap}px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => styles[props.value].background};
  color: ${(props) => styles[props.value].color};
  font-size: ${(props) => styles[props.value].fontSize}px;
  font-weight: bold;
  line-height: 107px;
  transition: top 0.1s, left 0.1s;
`;

type TileComponentProps = {
  tile: Tile;
  row: number;
  col: number;
  boardWidth: number;
  boardSize: number;
};

const TileComponent: React.FC<TileComponentProps> = ({ tile, row, col, boardWidth, boardSize }) => {
  const width = (boardWidth - (boardSize + 1) * boardGap) / boardSize;

  return (
    <StyledTileComponent value={tile.value} row={row} col={col} width={width}>
      {tile.value}
    </StyledTileComponent>
  );
};

export default TileComponent;
