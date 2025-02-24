'use client';
import { useCallback, useMemo, useState } from "react";
import { DragDropContext, DraggableLocation, Droppable, DropResult } from "@hello-pangea/dnd";
import { Button, Input } from "@heroui/react";

import { reorder, reorderTodoBetweenBoard } from "@/utils/reorder";
import { Board } from "@/components/Board";
import { BoardSkeleton } from "@/components/BoardSkeleton";
import { useBoardStore } from "@/hooks/useBoardStore";
// import { useIsMobile } from "@/hooks/useIsMobile";


export const KanbanBoard = () => {

    const [newBoardTitle, setNewBoardTitle] = useState('');

    const [searchBoard, setSearchBoard] = useState('');
    // const isMobile = useIsMobile();

    const { boardData, updateBoardData, boardOrder, setOrder, createBoard, filteredBoard } = useBoardStore((state) => state);

    // localStorage에 저장된 data 차이가 생겼을때 order를 업데이트
    if (boardOrder.length !== Object.keys(boardData).length) {
        setOrder(Object.keys(boardData));
    }

    const currentBoardData = useMemo(() => {
        return searchBoard === '' ? boardData : filteredBoard(searchBoard);
    }, [searchBoard, boardData, filteredBoard])

    const currentOrderData = useMemo(() => {
        return searchBoard === '' ? boardOrder : Object.keys(currentBoardData);
    }, [currentBoardData]);

    const handleBoardDragEnd = (result: DropResult) => {
        // 검색어 있으면 order 수정 방지
        if (searchBoard !== '') return;

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

    const handleCreateBoard = useCallback((title: string) => {
        if (title === '') {
            alert('보드 이름을 입력해주세요.');
            return;
        }
        createBoard(title)
        setNewBoardTitle('');
    }, []);

    return (
        <div className="Kanban-board-container">
            <div className="new-board-input flex flex-row gap-3 py-4 items-center">
                <Input
                    label="보드 생성"
                    type="text"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateBoard(newBoardTitle);
                        }
                    }}
                />
                <Button
                    color="success"
                    onPress={() => handleCreateBoard(newBoardTitle)}
                    variant="solid"
                    className=""
                >생성</Button>
            </div>
            <div className="new-board-input flex flex-row gap-3 py-4 items-center">
                <Input
                    isClearable
                    label="보드 검색"
                    type="text"
                    value={searchBoard}
                    onChange={(e) => setSearchBoard(e.target.value)}
                    onClear={() => setSearchBoard('')}
                />
            </div>
            <div className="kanban-board-box overflow-auto">

                {
                    currentOrderData.length === 0 ?
                        <div className="flex justify-center items-center h-96 text-gray-400 text-2xl">검색 결과가 없습니다.</div>
                        :
                        boardOrder.length === 0 ?
                            <BoardSkeleton />
                            :
                            <DragDropContext onDragEnd={handleBoardDragEnd}>
                                <Droppable droppableId="board" type="BOARD" direction='horizontal'>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`flex flex-row gap-3`}
                                        >

                                            {currentOrderData.map((key, index) => (
                                                <Board key={key} index={index} title={key} todos={currentBoardData[key]} />
                                            ))}

                                            <BoardSkeleton />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                }


            </div>
        </div>
    );
};