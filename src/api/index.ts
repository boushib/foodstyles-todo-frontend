import axios from 'axios'
import { store } from '../store'

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL })

api.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {}
  const token = store.getState().auth.token
  token && (config.headers.Authorization = `Bearer ${token}`)
  return config
})

export default api
