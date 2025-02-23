import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react'
import React, { useCallback, useState } from 'react'
import { Todo } from './KanbanBoard'
import { DraggableProvided } from '@hello-pangea/dnd'
import { useBoardStore } from '@/hooks/useBoardStore'
import { BoardDataMap } from '@/utils/reorder'
import { MenuIcon } from './MenuIcon'

export const TodoCard = ({ item, provided }: { item: Todo, provided: DraggableProvided }) => {

  const [value, setValue] = useState(item.content);

  const { boardData, updateBoardData } = useBoardStore((state) => state);

  const dispatch = (content: string = value, isDone: boolean = item.isDone) => {
    updateBoardData(updateItem(boardData, item.id, content, isDone))
  }

  const handleDelete = (id: string) => {
    const updated = Object.entries(boardData).map(([key, items]) => [
      key,
      items.filter(item => item.id !== id)
    ])
    updateBoardData(Object.fromEntries(updated));
  }

  const updateItem = useCallback((
    data: BoardDataMap,
    targetId: string,
    newContent: string,
    isDone: boolean
  ) => {
    const updated = Object.entries(data).map(([key, items]) => [
      key,
      items.map(item =>
        item.id === targetId ? { ...item, content: newContent, isDone } : item
      ),
    ])
    return Object.fromEntries(updated);
  }, []);

  return (<div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <Card className={`bg-white p-2 rounded-xl min-w-[250px] text-black shadow-lg border border-gray-200 space-y-4 ${item.isDone ? 'bg-green-400' : ''}`}>
      <CardHeader>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch();
            }
            if (e.key === 'Escape') {
              setValue(item.content);
            }
          }}
          onBlur={() => dispatch()}
          tabIndex={-1}
          className="bg-transparent border-none"
        />
      </CardHeader>
      <CardFooter className="flex flex-row-reverse items-center gap-2 text-gray-700">
        <Dropdown>
          <DropdownTrigger >
            <Button isIconOnly size="sm" variant="ghost" color="primary" className="p-1 border-none">
              <MenuIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant='bordered' >
            <DropdownItem
              key={item.isDone ? '취소' : '완료'}
              color="success"
              onPress={() => dispatch(value, !item.isDone)}
              className="text-black font-bold"
            >
              {item.isDone ? '취소' : '완료'}
            </DropdownItem>
            <DropdownItem
              key={'삭제'}
              color='danger'
              onPress={() => handleDelete(item.id)}
              className="text-black font-bold"
            >
              삭제
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardFooter>
    </Card>
  </div>)
}
