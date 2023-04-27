import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { classNames, CurrentColor } from '@/helpers';
import { ButtonLink } from '@/components/commons';
import { PencilIcon } from '@heroicons/react/24/solid';
export type props = {
  className?: string;
  cols: number;
  rows: number;
  items: { id: string; name: string }[];
};

type Square = {
  id: string;
  text: string;
  number: number;
};

type Column = {
  id: string;
  squares: Square[];
};

const ListEventSection: React.FC<props> = ({
  className,
  cols,
  rows,
  items,
}) => {
  const currentColor = CurrentColor();
  const [columns, setColumns] = useState<Column[]>(() => {
    const newColumns: Column[] = [];
    for (let i = 0; i < cols; i++) {
      const columnSquares: Square[] = [];
      for (let j = 0; j < rows; j++) {
        const number = j + i * rows + 1; // calculate the number based on row and column index
        if (items?.[number - 1])
          columnSquares.push({
            id: `square-${i}-${j}`,
            text: `${(i + 1) * j}`,
            number,
          });
      }
      newColumns.push({
        id: `column-${i}`,
        squares: columnSquares,
      });
    }
    return newColumns;
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const sourceIds = result.source.droppableId.split('-');
    const sourceColumnIndex = parseInt(sourceIds[1], 10);
    const sourceSquareIndex = result.source.index;

    const destinationIds = result.destination.droppableId.split('-');
    const destinationColumnIndex = parseInt(destinationIds[1], 10);
    const destinationSquareIndex = result.destination.index;

    if (sourceColumnIndex === destinationColumnIndex) {
      const newColumns = [...columns];
      const column = newColumns[sourceColumnIndex];
      const [removed] = column.squares.splice(sourceSquareIndex, 1);
      column.squares.splice(destinationSquareIndex, 0, removed);
      setColumns(newColumns);
    } else {
      const newColumns = [...columns];
      const sourceColumn = newColumns[sourceColumnIndex];
      const [removed] = sourceColumn.squares.splice(sourceSquareIndex, 1);
      const destinationColumn = newColumns[destinationColumnIndex];
      destinationColumn.squares.splice(destinationSquareIndex, 0, removed);
      setColumns(newColumns);
    }
  };

  const renderColumns = () => {
    return columns.map((column, columnIndex) => (
      <Droppable key={column.id} droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex flex-col ${
              columnIndex === columns.length - 1 ? '' : 'mr-2'
            }`}
          >
            {column.squares.map((square, index) => (
              <Draggable key={square.id} draggableId={square.id} index={index}>
                {(provided) => (
                  <div
                    className="relative"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div
                      className={classNames(
                        `w-24 h-12  group p-5 flex items-center justify-center shadow-md mx-2 my-2 text-sm bg-${currentColor} text-white`
                      )}
                    >
                      <p> # {items?.[square.number]?.name}</p>
                    </div>
                    <ButtonLink
                      className="absolute -top-1 -right-1"
                      href={`/panel/event/section/create?id=${
                        items?.[square.number]?.id
                      }`}
                      color="neutral"
                      shape="pill"
                      size="small"
                      iconLeft={<PencilIcon className="w-4 h-4" />}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classNames('flex', className)}>{renderColumns()}</div>
    </DragDropContext>
  );
};

export default ListEventSection;
