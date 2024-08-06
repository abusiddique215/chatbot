import { NextResponse } from 'next/server'
import openai from '../../../utils/openai'
import trainingData from '../../../utils/trainingData'

const systemPrompt = `You are an AI assistant for Headstarter, a free platform focused on technical interview preparation. You have been trained on the following data:

${trainingData.map(item => `${item.topic}: ${item.content}`).join('\n')}

Provide concise, accurate responses to user queries based on this information. Always maintain a professional, helpful tone. Emphasize that Headstarter is completely free to use. If you're unsure about specific Headstarter features, suggest the user check the official website or contact human support for the most up-to-date information.`

export async function POST(req) {
  const { message } = await req.json();
  // Here you would typically process the message and generate a response
  // For now, we'll just echo the message back
  const reply = `You said: "${message}". This is a placeholder response.`;
  return NextResponse.json({ reply });
}