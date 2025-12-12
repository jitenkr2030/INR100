import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { messages, userId, context } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const zai = await ZAI.create();

    // Build system prompt with financial context
    const systemPrompt = `You are an AI financial assistant for INR100.com, India's leading micro-investing platform. 

Your role is to help users with:
- Investment advice and portfolio analysis
- Market insights and trends
- Financial education and guidance
- Risk assessment and management
- Investment product recommendations
- Goal-based financial planning

Guidelines:
1. Always consider the user's risk tolerance and investment horizon
2. Provide clear, actionable advice
3. Explain financial concepts in simple terms
4. Never guarantee returns or make unrealistic promises
5. Always mention that investments are subject to market risks
6. Encourage diversification and long-term investing
7. Be compliant with Indian financial regulations
8. Keep responses concise but informative

User Context:
${context ? JSON.stringify(context, null, 2) : 'No additional context provided'}

Current Date: ${new Date().toLocaleDateString('en-IN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

Remember: You are not providing licensed financial advice, but educational insights and general guidance. Users should consult with certified financial advisors for personalized advice.`;

    // Format messages for the AI
    const formattedMessages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const completion = await zai.chat.completions.create({
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Log the conversation for analytics and improvement
    if (userId) {
      // Here you would save the conversation to your database
      // Example:
      // await db.userConversation.create({
      //   data: {
      //     userId,
      //     messages: JSON.stringify(messages),
      //     aiResponse: aiResponse,
      //     context: context ? JSON.stringify(context) : null
      //   }
      // });
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}