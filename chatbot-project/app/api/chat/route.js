import { NextResponse } from 'next/server'
import openai from '../../../utils/openai'
import trainingData from '../../../utils/trainingData'

const systemPrompt = `You are an AI assistant for Headstarter, a free platform focused on technical interview preparation. You have been trained on the following data:

${trainingData.map(item => `${item.topic}: ${item.content}`).join('\n')}

Provide concise, accurate responses to user queries based on this information. Always maintain a professional, helpful tone. Emphasize that Headstarter is completely free to use. If you're unsure about specific Headstarter features, suggest the user check the official website or contact human support for the most up-to-date information.`

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