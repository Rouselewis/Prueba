import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Group, Text } from 'react-konva';
import { useController, UseControllerProps } from 'react-hook-form';

export type props = {
  rows: number;
  columns: number;
} & UseControllerProps;

const SeatMap: React.FC<props> = ({ rows, columns, ...props }) => {
  const {
    field: { onChange, value },
  } = useController({ defaultValue: [], ...props });
  const [seats, setSeats] = useState(new Array(rows * columns).fill(true));
  const [seatElements, setSeatElements] = useState<any[]>();
  function handleSeatClick({ seatIndex, columnIndex, rowIndex }) {
    const newSeats = [...seats];
    newSeats[seatIndex] = !newSeats[seatIndex];
    onChange([
      ...value,
      { seatIndex, columnIndex, rowIndex, show: newSeats[seatIndex] },
    ]);

    setSeats(newSeats);
  }

  const seatSize = 30;
  const seatSpacing = 15;
  const canvasWidth = columns * (seatSize + seatSpacing) + seatSpacing;
  const canvasHeight = rows * (seatSize + seatSpacing) + seatSpacing;
  useEffect(() => {
    const items = [];
    for (let seatIndex = 0; seatIndex < rows * columns; seatIndex++) {
      const rowIndex = Math.floor(seatIndex / columns);
      const columnIndex = seatIndex % columns;
      const x = columnIndex * (seatSize + seatSpacing) + seatSpacing;
      const y = rowIndex * (seatSize + seatSpacing) + seatSpacing;
      items.push({ seatIndex, columnIndex, rowIndex, x, y, show: true });
    }
    setSeatElements(items);
    onChange(items);
  }, []);

  return (
    <div>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {seatElements?.map(({ seatIndex, rowIndex, columnIndex, x, y }) => (
            <Group
              key={seatIndex}
              x={x}
              y={y}
              onClick={() =>
                handleSeatClick({ seatIndex, columnIndex, rowIndex })
              }
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
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default SeatMap;
