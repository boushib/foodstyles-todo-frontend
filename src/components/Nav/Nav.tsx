import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuthState } from '../../store/authSlice'
import './Nav.sass'
import { useSelector } from '../../hooks'

const Nav = () => {
  const { user } = useSelector((s) => s.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearAuthState())
    navigate('/login')
  }

  return (
    <nav className="nav">
      {user && (
        <div className="nav__logout" onClick={handleLogout}>
          Logout
        </div>
      )}
      {!user && <Link to="/login">Login</Link>}
    </nav>
  )
}

export default Nav
