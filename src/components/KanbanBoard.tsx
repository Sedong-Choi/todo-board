import { DragDropContext, DraggableLocation, Droppable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { Board } from "./Board";
import { BoardDataMap, reorder, reorderTodoBetweenBoard } from "@/utils/reorder";


export interface Todo {
    id: string,
    content: string,
    isDone: boolean
}

export const KanbanBoard = ({ initial }: { initial: BoardDataMap }) => {
    const [boardData, setBoardData] = useState<BoardDataMap>(initial);
    const [ordered, setOrdered] = useState<string[]>(Object.keys(initial));

    const handleBoardDragEnd = (result: DropResult) => {

        if (!result.destination) return;

        // board order 변경
        if (result.type === "BOARD") {
            const reordered = reorder(ordered, result.source.index, result.destination.index);
            setOrdered(reordered);
            return ;
        }

        const source: DraggableLocation = result.source;
        const destination: DraggableLocation = result.destination;

        // 자신의 위치에서 변하지 않았으면 이동하지 않음
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }
        
        
        // 다른 보드간 이동 처리 및 동일 보드간 이동처리
        const data = reorderTodoBetweenBoard({
            boardDataMap:boardData,
            source,
            destination
        });
        
        setBoardData(data.boardDataMap)
    };


    return (<DragDropContext onDragEnd={handleBoardDragEnd}>
        <Droppable droppableId="board" type="BOARD" direction="horizontal">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-row gap-3 p-4">
                    {ordered.map((key, index) => (
                        <Board key={key} index={index} title={key} todos={boardData[key]} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
    );
};