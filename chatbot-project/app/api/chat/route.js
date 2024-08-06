import { NextResponse } from 'next/server'
import openai from '../../../utils/openai'

const systemPrompt = `You are an AI assistant for Headstarter, a free platform focused on technical interview preparation. Provide concise, accurate responses to user queries about:

1. Account management (e.g., sign-up process, profile updates)
2. Interview practice sessions (e.g., types of practice interviews available, how to access them)
3. Technical issues (e.g., platform access, browser compatibility)
4. Platform features (e.g., available resources, practice problem sets)
5. Programming languages and technologies covered
6. Progress tracking and performance metrics

Always maintain a professional, helpful tone. Emphasize that Headstarter is completely free to use. If you're unsure about specific Headstarter features, suggest the user check the official website or contact human support for the most up-to-date information.`

export async function POST(req) {
  const data = await req.json()

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }, ...data.messages],
      model: 'gpt-4',
      stream: true,
    })

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            const text = encoder.encode(content)
            controller.enqueue(text)
          }
        }
        controller.close()
      },
    })

    return new NextResponse(stream)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 })
  }
}