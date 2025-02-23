import { Draggable } from "@hello-pangea/dnd";

import { TodoList } from "./TodoList";
import { BoardData } from "./KanbanBoard";

// 보드 컴포넌트
export const Board = ({ title, index, board }: { title: string; index: number; board: BoardData }) => {
    return (
        <Draggable draggableId={title} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-4 rounded-lg min-w-[250px] text-black"
                >
                    <h3>{title}</h3>
                    <TodoList todos={board.todos} boardId={title} />
                </div>
            )}
        </Draggable>
    );
};