'use client';

import React from "react";

import { KanbanBoard } from "@/components/KanbanBoard";
import { useBoardStore } from "@/hooks/useBoardStore";
import { BoardDataMap } from "@/utils/reorder";

export default function Home() {
  return (
    <div className="h-full overflow-auto container mx-auto">
      <KanbanBoard />
    </div>
  )
}
