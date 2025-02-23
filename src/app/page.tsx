'use client';

import React from "react";

import { KanbanBoard } from "@/components/KanbanBoard";
import { BoardDataMap } from "@/utils/reorder";

export default function Home() {
  const initItems: BoardDataMap = {
    '12341234': [
      { id: '4', content: 'item 4', isDone: false },
      { id: '9', content: 'item 9', isDone: false },
      { id: '10', content: 'item 10', isDone: false }
    ],
    "test data":[
      { id: '1', content: 'item 1', isDone: false },
      { id: '3', content: 'item 3', isDone: false },
      { id: '11', content: 'item 11', isDone: false }
      
    ]
  };

  return (
    <main className="">
      <KanbanBoard initial={initItems} />
    </main>
  )
}
