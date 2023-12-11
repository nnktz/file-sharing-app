import { Resend } from 'resend'

import { EmailTemplate } from '@/components/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const response = await req.json()

    const data = await resend.emails.send({
      from: 'nhatnguyen@resend.dev',
      to: ['nhatnguyenktz119@gmail.com'],
      subject: response.userName + ' ' + 'share file with you',
      text: '',
      react: EmailTemplate({ response }),
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
