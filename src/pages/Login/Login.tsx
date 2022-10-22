import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { populateAuthState } from '../../store/authSlice'
import api from '../../api'
import Button from '../../components/Button'
import Card from '../../components/Card'
import FormInput from '../../components/FormInput'
import './Login.sass'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await api.post('/login', { email, password })
      const { user, token } = data
      dispatch(populateAuthState({ token, user, isInit: true }))
      navigate('/')
    } catch (error) {
      // TODO: Show error message
      console.error(error)
    }
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
