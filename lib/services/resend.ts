import axios from "axios"

export const resendApi = axios.create({
  baseURL: "https://api.resend.com",
  headers: {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  },
})
