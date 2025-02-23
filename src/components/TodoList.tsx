import { Draggable, Droppable } from "@hello-pangea/dnd";

import { Todo } from "./KanbanBoard";
import { TodoCard } from "./TodoCard";
import { useBoardStore } from "@/hooks/useBoardStore";


export const TodoList = ({ todos, boardId }: { todos: Todo[]; boardId: string }) => {
    const { createTodo } = useBoardStore((state) => state);
    return (
        <Droppable droppableId={boardId} type="TODO-LIST">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col h-[300px] min-w-[200px] bg-slate-500 border border-slate-400 rounded-lg gap-1 overflow-y-auto p-1"
                >
                    {
                        todos.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <TodoCard item={item} provided={provided} />
                                )}
                            </Draggable>
                        ))
                    }
                    <div className="flex justify-center items-center text-white p-4 opacity-50"
                        onClick={() => createTodo(boardId)}
                    >Todo 생성</div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

