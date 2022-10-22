import './Button.sass'

interface Props {
  type?: 'button' | 'submit'
  isDisabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

const FormInput = ({ type = 'submit', children, isDisabled = false, onClick }: Props) => (
  <button className="btn" type={type} onClick={onClick} disabled={isDisabled}>
    {children}
  </button>
)

export default FormInput
