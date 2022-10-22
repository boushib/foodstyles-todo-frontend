import classNames from 'classnames'
import Logo from '../Logo'
import './Card.sass'

interface Props {
  className?: string
  heading?: string
  subheading?: string
  children: React.ReactNode
}

const Card = ({ className, heading, subheading, children }: Props) => (
  <div className={classNames({ card: true, [`${className}`]: className })}>
    {(heading || subheading) && (
      <div className="card__header">
        <Logo className="card__logo" />
        <h2 className="card__heading">{heading}</h2>
        <p className="card__subheading">{subheading}</p>
      </div>
    )}
    {children}
  </div>
)

export default Card
