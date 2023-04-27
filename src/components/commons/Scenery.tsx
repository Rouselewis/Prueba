import { Stage, Layer, Rect } from 'react-konva';
import { classNames } from '@/helpers';

export type props = {
  className?: string;
};

const Scenery: React.FC<props> = ({ className }) => {
  const stageWidth = window.innerWidth;
  const stageHeight = window.innerHeight;
  const rectWidth = 100;
  const rectHeight = 50;
  const padding = 5; // add some space between squares
  const cols = Math.floor((stageWidth - rectWidth) / (rectWidth + padding)); // calculate the number of columns
  const rows = Math.floor((stageHeight - rectHeight) / (rectHeight + padding)); // calculate the number of rows
  const startX = (stageWidth - cols * (rectWidth + padding)) / 2;
  const startY = (stageHeight - rows * (rectHeight + padding)) / 2;
  let currentX = startX;
  let currentY = startY;

  return (
    <div className={classNames('', className)}>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer fill="gray">
          {[...Array(rows)].map((_, rowIndex) => {
            return [...Array(cols)].map((_, colIndex) => {
              const x = currentX + colIndex * (rectWidth + padding);
              const y = currentY + rowIndex * (rectHeight + padding);
              return (
                <Rect
                  key={`${rowIndex}-${colIndex}`}
                  x={x}
                  y={y}
                  width={rectWidth}
                  height={rectHeight}
                  fill="blue"
                  offsetX={rectWidth / 2}
                  offsetY={rectHeight / 2}
                />
              );
            });
          })}
          <Rect
            x={startX + ((cols - 1) * (rectWidth + padding)) / 2}
            y={startY + ((rows - 1) * (rectHeight + padding)) / 2}
            width={500 + padding}
            height={250 + padding}
            fill="green"
            offsetX={(500 + padding) / 2}
            offsetY={(250 + padding) / 2}
            cornerRadius={50}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Scenery;
