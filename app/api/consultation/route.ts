import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    let body: any = {}
    try {
      body = await req.json()
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    const { name, phone, email } = body
    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT || 587)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const adminEmail = process.env.ADMIN_EMAIL

    if (!smtpHost || !smtpUser || !smtpPass || !adminEmail) {
      return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
    }

    // Use environment variables (keeps secrets out of the repo)
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    // Verify connection/config first for clearer errors
    try {
      await transporter.verify()
    } catch (err: any) {
      return NextResponse.json({ error: 'SMTP verification failed', details: err?.message ?? String(err) }, { status: 500 })
    }

    await transporter.sendMail({
      from: `JM Investments <${smtpUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: 'New Consultation Request',
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Phone:</b> ${phone}</p><p><b>Email:</b> ${email}</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    const message = (e as any)?.message ?? 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


