"use client"
import { useParams } from "next/navigation"
export default function page() {
  const { projectId } = useParams()

  return (
    <div className="custom-container">
      <h1>{projectId}</h1>
    </div>
  )
}
