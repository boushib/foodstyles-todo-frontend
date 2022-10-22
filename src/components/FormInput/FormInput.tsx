import './FormInput.sass'

interface Props {
  type?: 'text' | 'email' | 'password'
  value: string
  placeholder?: string
  isDisabled?: boolean
  onChange: (value: string) => void
}

const FormInput = ({ type = 'text', value, placeholder, isDisabled = false, onChange }: Props) => (
  <input
    className="form-input"
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={isDisabled}
  />
)

export default FormInput
