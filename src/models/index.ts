export type TodoItemStatus = 'IN_PROGRESS' | 'COMPLETED'

export interface IUser {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface ITodoItem {
  id: number
  title: string
  status: TodoItemStatus
  user_id: number
  created_at: string
  updated_at: string
}
