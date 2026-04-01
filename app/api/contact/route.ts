import { NextRequest, NextResponse } from "next/server"
import { ContactSchema } from "@/lib/schemas/contact.schema"
import { resendApi } from "@/lib/services/resend"

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
    const res = await resendApi.post("/emails", {
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rashidvisda@gmail.com",
      subject: subject || "New Portfolio Message",
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h1>New Message from: ${name}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    })

    return NextResponse.json({
      message: "Email sent!",
      success: 200,
      data: res.data,
    })
  } catch (error: any) {
    // 4. Axios errors are caught here. We extract the message from Resend's response.
    console.error("Resend Error:", error.response?.data || error.message)

    const serverError = error.response?.data?.message || "Failed to send email"

    return NextResponse.json(
      { error: serverError },
      { status: error.response?.status || 500 }
    )
  }
}
