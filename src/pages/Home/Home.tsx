import { useEffect, useState } from 'react'
import classNames from 'classnames'
import api from '../../api'
import Card from '../../components/Card'
import FormInput from '../../components/FormInput'
import TodoItem from '../../components/TodoItem'
import { ITodoItem, TodoItemStatus } from '../../models'
import { useSelector } from '../../hooks'
import './Home.sass'

const Home = () => {
  const FILTERS = ['All', 'Completed', 'Uncompleted']
  const { isInit, user } = useSelector((s) => s.auth)
  const [currentFilter, setCurrentFilter] = useState(FILTERS[0])
  const [todos, setTodos] = useState<ITodoItem[]>([])
  const [title, setTitle] = useState('')
  const [formError, setFormError] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    isInit && user && handleFetchTodos()
  }, [currentFilter, isInit, user])

  useEffect(() => {
    formError && setFormError('')
  }, [title])

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/todos', { title })
      setTodos([...todos, data])
      setTitle('')
    } catch (error: any) {
      setFormError(error.response.data.message)
    }
  }

  const handleFetchTodos = async () => {
    setError('')
    try {
      const { data } = await api.get(`/todos`)
      switch (currentFilter) {
        case 'Completed':
          setTodos(data.todos.filter((todo: ITodoItem) => todo.status === 'COMPLETED'))
          break
        case 'Uncompleted':
          setTodos(data.todos.filter((todo: ITodoItem) => todo.status === 'IN_PROGRESS'))
          break
        default:
          setTodos(data.todos)
      }
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  const handleUpdateTodoItem = async (id: number, status: TodoItemStatus) => {
    setError('')
    // Let's an optimistic update
    const _todos = [...todos]
    const idx = _todos.findIndex((todo) => todo.id === id)
    _todos[idx].status = status

    try {
      setTodos(_todos)
      await api.patch(`/todos/${id}`, { status })
    } catch (error: any) {
      _todos[idx].status = status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED'
      setTodos(_todos)
      setError(error.response.data.message)
    }
  }

  const handleRemoveTodoItem = async (id: number) => {
    setError('')
    // Let's an optimistic update
    const _todos = [...todos]
    setTodos(_todos.filter((todo) => todo.id !== id))

    try {
      await api.delete(`/todos/${id}`)
    } catch (error: any) {
      setTodos(_todos)
      setError(error.response.data.message)
    }
  }

  return (
    <div className="home page">
      <div className="container">
        <Card heading="Todo List" className="home__card">
          <form className="form home__form" onSubmit={handleAddTodo}>
            <FormInput
              value={title}
              onChange={setTitle}
              error={formError}
              placeholder="Add a new todo"
            />
          </form>
          <div className="home__todos">
            {todos.map((todoItem) => (
              <TodoItem
                {...todoItem}
                onUpdateStatus={() => {
                  handleUpdateTodoItem(
                    todoItem.id,
                    todoItem.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED'
                  )
                }}
                onRemove={() => handleRemoveTodoItem(todoItem.id)}
                key={todoItem.id}
              />
            ))}
          </div>
          <div className="home__filters">
            <b>Show:</b>
            {FILTERS.map((filter) => (
              <div
                className={classNames({
                  home__filter: true,
                  'home__filter--active': filter === currentFilter,
                })}
                onClick={() => setCurrentFilter(filter)}
                key={filter}
              >
                {filter}
              </div>
            ))}
          </div>
          {error && <div className="error">{error}</div>}
        </Card>
      </div>
    </div>
  )
}

export default Home
