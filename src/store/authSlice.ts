import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../models'

export interface AuthState {
  token: string | null
  user: IUser | null
  isInit: boolean
}

const initialState: AuthState = {
  token: null,
  user: null,
  isInit: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initAuth: (state) => {
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      const user = storedUser ? JSON.parse(storedUser) : null
      state.token = token
      state.user = user
      state.isInit = true
    },
    populateAuthState: (state, action: PayloadAction<AuthState>) => {
      const { token, user } = action.payload
      if (!token || !user) return
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      state.token = token
      state.user = user
    },
    clearAuthState: (state) => {
      state.token = null
      state.user = null
      localStorage.clear()
    },
  },
})

export const { initAuth, populateAuthState, clearAuthState } = authSlice.actions
export default authSlice.reducer
