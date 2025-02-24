import { Button } from "@heroui/react";

import { useBoardStore } from "@/hooks/useBoardStore";

// 보드 컴포넌트
export const BoardSkeleton = () => {
    const { createBoard } = useBoardStore((state) => state);
    return (
        <div
        className="flex-none flex flex-col bg-white rounded-lg w-[300px] text-black justify-center items-center min-h-[400px] h-full self-center"
            // className="flex-none bg-white rounded-lg w-[300px] text-black min-h-[400px] self-center h-full"
        >
            <Button
                onPress={() => createBoard()}
                className="min-h-full self-center w-full flex-1"
                variant="light"
                size="lg"
            >
                <h2>보드 생성</h2>
            </Button>
        </div>
    );
};