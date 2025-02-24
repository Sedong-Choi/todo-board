import { BoardDataMap, Todo } from "@/hooks/useBoardStore";
import { DraggableLocation } from "@hello-pangea/dnd";

// 단순 순서 변경 함수
export function reorder<TItem>(
    list: TItem[],
    startIndex: number,
    endIndex: number,
): TItem[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

interface ReorderTodoBetweenBoardProps {
    boardDataMap: BoardDataMap;
    source: DraggableLocation;
    destination: DraggableLocation;
}

interface ReorderTodoBetweenBoardResult {
    boardDataMap: BoardDataMap;
}

export const reorderTodoBetweenBoard = ({
    boardDataMap,
    source,
    destination,
}: ReorderTodoBetweenBoardProps): ReorderTodoBetweenBoardResult => {

    const current: Todo[] = [...boardDataMap[source.droppableId]];
    const next: Todo[] = [...boardDataMap[destination.droppableId]];
    const target: Todo = current[source.index];

    // 동일한 list 에서 이동시 처리
    if (source.droppableId === destination.droppableId) {
        const reordered: Todo[] = reorder(
            current,
            source.index,
            destination.index,
        );
        const result: BoardDataMap = {
            ...boardDataMap,
            [source.droppableId]: reordered,
        };
        return {
            boardDataMap: result,
        };
    }

    // 보드간 공유된 아이템 이동 처리

    // 원본에서 제거
    current.splice(source.index, 1);
    // 옮겨진 대상에 추가
    next.splice(destination.index, 0, target);

    const result: BoardDataMap = {
        ...boardDataMap,
        [source.droppableId]: current,
        [destination.droppableId]: next,
    };

    return {
        boardDataMap: result,
    };
};