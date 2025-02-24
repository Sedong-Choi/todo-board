'use client';

import React, { Suspense } from "react";



import dynamic from "next/dynamic";
const KanbanBoard = dynamic(() => import("@/components/KanbanBoard"), { ssr: false });

export default function Home() {
  return (
    <div className="h-full overflow-auto container mx-auto" suppressHydrationWarning>
      <Suspense fallback={<div>Loading...</div>}>
        <KanbanBoard />
      </Suspense>
    </div>
  )
}
