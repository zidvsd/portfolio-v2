export interface Achievement {
  _id: string
  name: string
  issuer: string
  dateIssued: string
  supabaseUrl: string
  type: "certificate" | "badge"
  alt: string
}
