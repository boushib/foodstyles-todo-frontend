import classNames from "classnames"
import "./Checkbox.sass"

type Props = {
  isChecked?: boolean
  isDisabled?: boolean
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}

const Checkbox = ({
  isChecked = false,
  isDisabled = false,
  children,
  onChange,
}: Props) => {
  return (
    <label
      className={classNames({
        checkbox: true,
        "checkbox--read-only": !onChange,
        "checkbox--disabled": isDisabled,
      })}
    >
      <input
        type="checkbox"
        onChange={(e) => onChange && onChange(e.target.checked)}
        checked={isChecked}
      />
      <span className="checkmark"></span>
      {children}
    </label>
  )
}

export default Checkbox
