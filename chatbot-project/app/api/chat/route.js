import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = "You are a helpful assistant for Headstarter, a platform focused on technical interview preparation. Provide concise and accurate responses to user queries about account management, interview practice sessions, technical issues, and subscription inquiries."

export async function POST(req) {
  const openai = new OpenAI()
  const data = await req.json()

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: systemPrompt }, ...data.messages],
    model: 'gpt-4',
    stream: true,
  })

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            const text = encoder.encode(content)
            controller.enqueue(text)
          }
        }
      } catch (err) {
        controller.error(err)
      } finally {
        controller.close()
      }
    },
  })

  return new NextResponse(stream)
}