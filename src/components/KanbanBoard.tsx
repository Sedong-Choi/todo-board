'use client';
import { DragDropContext, DraggableLocation, Droppable, DropResult } from "@hello-pangea/dnd";
import { reorder, reorderTodoBetweenBoard } from "@/utils/reorder";

import { Board } from "@/components/Board";
import { BoardSkeleton } from "@/components/BoardSkeleton";
import { useBoardStore } from "@/hooks/useBoardStore";
// import { useIsMobile } from "@/hooks/useIsMobile";


export interface Todo {
    id: string,
    content: string,
    isDone: boolean
}

export const KanbanBoard = () => {

    // const isMobile = useIsMobile();

    const { boardData, updateBoardData, boardOrder, setOrder } = useBoardStore((state) => state);

    if (boardOrder.length !== Object.keys(boardData).length) {
        setOrder(Object.keys(boardData));
    }

    const handleBoardDragEnd = (result: DropResult) => {

        if (!result.destination) return;

        // board order 변경
        if (result.type === "BOARD") {
            const reordered = reorder(boardOrder, result.source.index, result.destination.index);
            setOrder(reordered);
            return;
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
            boardDataMap: boardData,
            source,
            destination
        });

        updateBoardData(data.boardDataMap)
    };

    if (Object.keys(boardData).length === 0) {

        return <BoardSkeleton />

    }


    return (<DragDropContext onDragEnd={handleBoardDragEnd}>
        <Droppable droppableId="board" type="BOARD" direction='horizontal'>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex flex-row p-4 gap-3`}
                >

                    {boardOrder.map((key, index) => (
                        <Board key={key} index={index} title={key} todos={boardData[key]} />
                    ))}

                    <BoardSkeleton />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
    );
};