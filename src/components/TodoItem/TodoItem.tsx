import CrossmarkIcon from '../../icons/Crossmark'
import { ITodoItem } from '../../models'
import Checkbox from '../Checkbox'
import './TodoItem.sass'

interface Props extends ITodoItem {
  onUpdateStatus: () => void
  onRemove: () => void
}

const TodoItem = ({ id, title, status, onUpdateStatus, onRemove }: Props) => (
  <div className="todo-item">
    <Checkbox isChecked={status === 'COMPLETED'} onChange={onUpdateStatus} key={id}>
      {title}
    </Checkbox>
    <div className="todo-item__remove" onClick={onRemove}>
      <CrossmarkIcon />
    </div>
  </div>
)

export default TodoItem
