import axios from "axios"

const blogsApi = axios.create({
  baseURL: process.env.MONGODB_URI,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})
export default blogsApi
