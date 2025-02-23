import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";

import { reorder } from "@/utils/reorder";

import { Todo } from "./KanbanBoard";
import { TodoCard } from "./TodoCard";



export const TodoList = ({ todos, columnId }: { todos: Todo[]; columnId: string }) => {

    const [items, setItems] = useState<Todo[]>(todos ?? []);

    // board 내부의 Todo의 DnD action 정의
    const handleTodoDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        if (result.source.droppableId !== columnId) return;

        const updatedItems = reorder(items, result.source.index, result.destination.index);
        setItems(updatedItems);
    };

    return (
        <DragDropContext onDragEnd={handleTodoDragEnd}>
            <Droppable droppableId={columnId} type="TODO-LIST">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col h-[300px] min-w-[200px] bg-slate-500 border border-slate-400 rounded-lg gap-1 overflow-y-auto p-1"
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <TodoCard item={item} provided={provided} />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

