import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input
} from "@heroui/react";

import { Todo, useBoardStore } from "@/hooks/useBoardStore";
import { TodoList } from "@/components/TodoList";
import { MenuIcon } from "./MenuIcon";

// 보드 컴포넌트
export const Board = ({ title, index, todos }: { title: string; index: number; todos: Todo[] }) => {
    const { createTodo, deleteBoard, updateBoardTitle } = useBoardStore((state) => state);

    const [value, setValue] = useState(title);
    const handleUpdateTitle = () => {
        updateBoardTitle(title, value);
    }

    return (
        <Draggable draggableId={title} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex-none bg-white p-4 rounded-lg w-[300px] text-black min-h-[400px] self-center"
                >
                    <div className="flex flex-row justify-between items-center pb-4">
                        <h3>
                            <Input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUpdateTitle()
                                    }
                                    if (e.key === 'Escape') {
                                        setValue(title)
                                    }
                                }}
                                tabIndex={-1}
                                onBlur={() => {
                                    handleUpdateTitle()
                                }}
                                className="bg-none border-none"
                            />
                        </h3>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="ghost" color="primary" className="p-1 border-none">
                                    <MenuIcon />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant='bordered' >
                                <DropdownItem
                                    key={'생성'}
                                    color="success"
                                    onPress={() => createTodo(title)}
                                    className="text-black font-bold"
                                >
                                    Todo 생성
                                </DropdownItem>
                                <DropdownItem
                                    key={'삭제'}
                                    color='danger'
                                    onPress={() => deleteBoard(title)}
                                    className="text-black font-bold"
                                >
                                    삭제
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <TodoList todos={todos} boardId={title} />
                </div>
            )}
        </Draggable>
    );
};