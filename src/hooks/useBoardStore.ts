import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { BoardDataMap } from '@/utils/reorder'

type BoardStore = {
  boardData: BoardDataMap,
  updateBoardData: (newBoardData: BoardDataMap) => void
  updateBoardTitle: (originTitle: string, newTitle: string) => void,
  createBoard: () => void,
  deleteBoard: (boardTitle: string) => void
  createTodo: (boardTitle: string) => void
}


export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boardData: {
        '12341234': [
          { id: '4', content: 'item 4', isDone: false },
          { id: '9', content: 'item 9', isDone: false },
          { id: '10', content: 'item 10', isDone: false }
        ],
        "test data": [
          { id: '1', content: 'item 1', isDone: false },
          { id: '3', content: 'item 3', isDone: false },
          { id: '11', content: 'item 11', isDone: false }

        ]
      } as BoardDataMap,
      updateBoardData: (newBoardData: BoardDataMap) => {
        set({ boardData: newBoardData })
      },
      createBoard: () => {
        set((state) => ({
          ...state, boardData: {
            ...state.boardData,
            [`보드 - ${Math.random().toString(36).substr(2, 3)}`]: []
          }
        }))
      },
      updateBoardTitle: (originTitle: string, newTitle: string) => {
        if( newTitle === originTitle) return;
        if( newTitle ==='') return ;
        if( newTitle in useBoardStore.getState().boardData) {
            alert('이미 존재하는 이름 입니다.');
            return ;
        }
        set((state) => {
          const updated = Object.fromEntries(
            Object.entries(state.boardData).map(([key, value]) => {
              if (key === originTitle) {
                return [newTitle, value]
              }
              return [key, value]
            })
          )
          return {
            ...state,
            boardData: updated
          }
        })
      },
      deleteBoard: (boardTitle: string) => {
        set((state) => {
          const deleted: BoardDataMap = Object.fromEntries(
            Object.entries(state.boardData).filter(([key]) => key !== boardTitle));
          return {
            ...state,
            boardData: deleted
          };
        })
      },
      createTodo: (boardId: string) => {
        set((state) => {
          const newTodo = { id: Math.random().toString(36).substr(2, 9), content: "New Todo", isDone: false }
          return {
            ...state,
            boardData: {
              ...state.boardData,
              [boardId]: [...state.boardData[boardId], newTodo]
            }
          }
        })
      }
    }), {
    name: 'todo-board-data-storage',
    partialize: (state) => ({ boardData: state.boardData }),
    onRehydrateStorage: (state) => {
      /* if (state?.boardData) {
        console.log("데이터 로드 완료", state.boardData);
      } else {
        console.log("로컬 스토리지에 데이터가 없습니다.");
      } */
    },

  },
  ),
)
