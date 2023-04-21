import React, { useState } from 'react';
import { Stage, Layer, Circle, Group, Text } from 'react-konva';

export type props = {
  rows: number;
  columns: number;
};

const SeatMap: React.FC<props> = ({ rows, columns }) => {
  const [seats, setSeats] = useState(new Array(rows * columns).fill(true));

  function handleSeatClick(seatIndex: number) {
    const newSeats = [...seats];
    newSeats[seatIndex] = !newSeats[seatIndex];
    setSeats(newSeats);
  }

  const seatSize = 30;
  const seatSpacing = 1;
  const canvasWidth = columns * (seatSize + seatSpacing) + seatSpacing;
  const canvasHeight = rows * (seatSize + seatSpacing) + seatSpacing;

  const seatElements = [];

  for (let seatIndex = 0; seatIndex < rows * columns; seatIndex++) {
    const rowIndex = Math.floor(seatIndex / columns);
    const columnIndex = seatIndex % columns;

    const x = columnIndex * (seatSize + seatSpacing) + seatSpacing;
    const y = rowIndex * (seatSize + seatSpacing) + seatSpacing;

    seatElements.push(
      <Group
        key={seatIndex}
        x={x}
        y={y}
        onClick={() => handleSeatClick(seatIndex)}
      >
        <Circle
          radius={seatSize / 2}
          fill={seats[seatIndex] ? 'green' : 'red'}
        />
        <Text
          text={`${seatIndex + 1}`}
          fontSize={10}
          fontFamily="Arial"
          fill="white"
          align="center"
          verticalAlign="middle"
          x={-seatSize / 2}
          y={-seatSize / 2}
          width={seatSize}
          height={seatSize}
        />
      </Group>
    );
  }

  return (
    <div>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>{seatElements}</Layer>
      </Stage>
    </div>
  );
};

export default SeatMap;
