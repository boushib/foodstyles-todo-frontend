import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Card from '../../components/Card'
import FormInput from '../../components/FormInput'
import './Login.sass'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <div className="auth page">
      <div className="container">
        <Card className="auth__card" heading="Welcome back!" subheading="Log in to continue.">
          <form className="form auth__form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
            <Link to="/signup" className="auth__link">
              Don't have an account? Sign up.
            </Link>
            <Button>Log in</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Login
