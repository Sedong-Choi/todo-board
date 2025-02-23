import { Draggable } from "@hello-pangea/dnd";

import { TodoList } from "./TodoList";
import { Todo } from "./KanbanBoard";

// 보드 컴포넌트
export const Board = ({ title, index, todos }: { title: string; index: number; todos: Todo[] }) => {
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
                    <TodoList todos={todos} boardId={title} />
                </div>
            )}
        </Draggable>
    );
};