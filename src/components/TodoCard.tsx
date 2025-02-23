import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import React from 'react'
import { Todo } from './KanbanBoard'
import { DraggableProvided } from '@hello-pangea/dnd'

export const TodoCard = ({ item, provided }: { item: Todo, provided: DraggableProvided }) => {
  return (<div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <Card className="bg-white p-4 rounded-lg min-w-[200px] text-black">
      <CardHeader>

      </CardHeader>
      <CardBody>
        {item.content}
      </CardBody>
      <CardFooter className="flex flex-row items-center">
        {item.isDone ? '완료' : '미완료'}
      </CardFooter>
    </Card>
  </div>)
}
