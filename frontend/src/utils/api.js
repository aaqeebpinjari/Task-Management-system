import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'


export const getTasks = async (params = {}) => {
  const { status, sortBy, page, limit } = params
  const queryParams = new URLSearchParams()
  
  if (status) queryParams.append('status', status)
  if (sortBy) queryParams.append('sortBy', sortBy)
  if (page) queryParams.append('page', page)
  if (limit) queryParams.append('limit', limit)
  
  const response = await axios.get(`/tasks?${queryParams.toString()}`)
  return response.data
}

/*Create a new task*/
export const createTask = async (taskData) => {
  const response = await axios.post('/tasks', taskData)
  return response.data
}

/*Update an existing task*/
export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`/tasks/${taskId}`, taskData)
  return response.data
}

/*Delete a task*/
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`/tasks/${taskId}`)
  return response.data
}

