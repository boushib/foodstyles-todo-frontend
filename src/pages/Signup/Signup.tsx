import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Card from '../../components/Card'
import FormInput from '../../components/FormInput'
import './Signup.sass'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ name, email, password })
  }

  return (
    <div className="auth page">
      <div className="container">
        <Card
          className="auth__card"
          heading="Welcome!"
          subheading="Sign up to start using FoodStyles Todo today."
        >
          <form className="form auth__form" onSubmit={handleSubmit}>
            <FormInput value={name} onChange={setName} placeholder="Enter your full name" />
            <FormInput
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
            />
            <FormInput
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Choose a password"
            />
            <Link to="/login" className="auth__link">
              Already have an account? Sign in.
            </Link>
            <Button>Sign up</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Signup