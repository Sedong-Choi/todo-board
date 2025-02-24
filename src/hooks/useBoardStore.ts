import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export interface BoardDataMap {
  [key: string]: Todo[];
}
export interface Todo {
  id: string,
  content: string,
  isDone: boolean,
  createdAt: string;
}
type BoardStore = {
  boardData: BoardDataMap,
  boardOrder: string[],
  setOrder: (newOrder: string[]) => void,
  updateBoardData: (newBoardData: BoardDataMap) => void,
  updateBoardTitle: (originTitle: string, newTitle: string) => void,
  createBoard: (boardTitle?: string) => void,
  deleteBoard: (boardTitle: string) => void
  createTodo: (boardTitle: string) => void
}


export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boardOrder: [],
      setOrder: (newOrder) => set({ boardOrder: newOrder }),
      boardData: {} as BoardDataMap,
      updateBoardData: (newBoardData: BoardDataMap) => {
        set({ boardData: newBoardData })
      },
      createBoard: (boardTitle) => {
        const title = boardTitle ?? `보드 - ${Math.random().toString(36).substr(2, 3)}`;
        set((state) => ({
          ...state,
          boardData: {
            ...state.boardData,
            [title]: []
          },
          boardOrder: [title, ...state.boardOrder],
        }))
      },
      updateBoardTitle: (originTitle: string, newTitle: string) => {
        if (newTitle === originTitle) return;
        if (newTitle === '') return;
        if (newTitle in useBoardStore.getState().boardData) {
          alert('이미 존재하는 이름 입니다.');
          return;
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
          const deletedOrder = state.boardOrder.filter((title) => title !== boardTitle);
          return {
            ...state,
            boardData: deleted,
            boardOrder: deletedOrder
          };
        })
      },
      createTodo: (boardId: string) => {
        set((state) => {
          const newTodo = {
            id: Math.random().toString(36).substr(2, 9),
            content: "New Todo",
            isDone: false,
            createdAt: new Date().toISOString()
          }
          return {
            ...state,
            boardData: {
              ...state.boardData,
              [boardId]: [...state.boardData[boardId], newTodo]
            }
          }
        })
      }
    }),
    {
      name: 'todo-board-data-storage',
      partialize: (state) => ({ boardData: state.boardData, boardOrder: state.boardOrder }),
      onRehydrateStorage: (state) => {

        if (state?.boardData) {
          console.log("데이터 로드 완료", state.boardData);
        } else {
          console.log("로컬 스토리지에 데이터가 없습니다.");
        }

        if (Object.keys(state.boardData).length !== state.boardOrder.length) {
          console.log('데이터가 정확하지 않습니다.')
        }
      },
    },
  ),
)
