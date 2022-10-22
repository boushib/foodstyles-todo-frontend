import './FormInput.sass'

interface Props {
  type?: 'text' | 'email' | 'password'
  value: string
  placeholder?: string
  isDisabled?: boolean
  error?: string
  onChange: (value: string) => void
}

const FormInput = ({
  type = 'text',
  value,
  placeholder,
  isDisabled = false,
  error,
  onChange,
}: Props) => (
  <div className="form-input__container">
    <input
      className="form-input"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={isDisabled}
    />
    {error && <p className="form-input__error">{error}</p>}
  </div>
)

export default FormInput
