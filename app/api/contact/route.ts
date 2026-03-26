import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { ContactSchema } from "@/lib/schema"
import { error } from "node:console"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()

  const validation = ContactSchema.safeParse(body)
  if (!validation.success) {
    return Response.json(
      {
        error: "Validation Failed",
        details: validation.error.format(),
      },
      { status: 400 }
    )
  }

  const { name, email, subject, message } = validation.data
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rashidvisda@gmail.com",
      subject: subject || "New Portfolio Message",
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h1>New Message from: ${name}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    })
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }
    return NextResponse.json({ message: "Email sent!", success: 200, data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
