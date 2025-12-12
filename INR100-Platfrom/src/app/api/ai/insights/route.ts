import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { type, userId, portfolioData, marketData, userPreferences } = await request.json();

    const zai = await ZAI.create();

    let prompt = '';
    let response = {};

    switch (type) {
      case 'portfolio_analysis':
        prompt = `Analyze the following investment portfolio and provide insights:
        
        Portfolio Data: ${JSON.stringify(portfolioData)}
        Market Conditions: ${JSON.stringify(marketData)}
        User Risk Profile: ${userPreferences?.riskProfile || 'moderate'}
        
        Please provide:
        1. Overall portfolio health score (0-100)
        2. Key strengths and weaknesses
        3. Specific recommendations for improvement
        4. Risk assessment
        5. Diversification analysis
        
        Format the response as JSON with the following structure:
        {
          "healthScore": number,
          "strengths": string[],
          "weaknesses": string[],
          "recommendations": string[],
          "riskLevel": "low" | "medium" | "high",
          "diversificationScore": number,
          "summary": string
        }`;
        break;

      case 'investment_recommendation':
        prompt = `Based on the user's profile and current market conditions, provide personalized investment recommendations:
        
        User Profile: ${JSON.stringify(userPreferences)}
        Current Portfolio: ${JSON.stringify(portfolioData)}
        Market Data: ${JSON.stringify(marketData)}
        
        Please recommend 3-5 investment opportunities with:
        1. Asset name and symbol
        2. Investment rationale
        3. Suggested allocation percentage
        4. Risk level
        5. Expected returns (1 year)
        6. Time horizon
        
        Format the response as JSON with the following structure:
        {
          "recommendations": [
            {
              "name": string,
              "symbol": string,
              "type": "stock" | "mutual_fund" | "etf" | "gold" | "global",
              "rationale": string,
              "allocation": number,
              "riskLevel": "low" | "medium" | "high",
              "expectedReturns": number,
              "timeHorizon": string,
              "confidence": number (0-100)
            }
          ],
          "summary": string
        }`;
        break;

      case 'market_insights':
        prompt = `Analyze current market conditions and provide actionable insights for Indian investors:
        
        Market Data: ${JSON.stringify(marketData)}
        User Focus Areas: ${JSON.stringify(userPreferences?.focusAreas || [])}
        
        Provide insights on:
        1. Current market trends
        2. Sectors to watch
        3. Risk factors
        4. Opportunities
        5. Investment strategy suggestions
        
        Format the response as JSON with the following structure:
        {
          "marketTrends": string[],
          "sectorsToWatch": string[],
          "riskFactors": string[],
          "opportunities": string[],
          "strategySuggestions": string[],
          "overallSentiment": "bullish" | "bearish" | "neutral",
          "summary": string
        }`;
        break;

      case 'risk_alert':
        prompt = `Analyze the following portfolio for potential risks and provide alerts:
        
        Portfolio Data: ${JSON.stringify(portfolioData)}
        Market Data: ${JSON.stringify(marketData)}
        User Risk Tolerance: ${userPreferences?.riskTolerance || 'moderate'}
        
        Identify and assess:
        1. Concentration risks
        2. Market risks
        3. Sector-specific risks
        4. Liquidity risks
        5. Volatility risks
        
        Format the response as JSON with the following structure:
        {
          "alerts": [
            {
              "type": "concentration" | "market" | "sector" | "liquidity" | "volatility",
              "severity": "low" | "medium" | "high",
              "title": string,
              "description": string,
              "recommendation": string,
              "affectedAssets": string[]
            }
          ],
          "overallRiskScore": number (0-100),
          "summary": string
        }`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid AI insight type' }, { status: 400 });
    }

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert financial advisor specializing in Indian markets. Provide accurate, actionable, and personalized investment insights. Always consider risk factors and regulatory compliance. Format responses as specified JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    try {
      response = JSON.parse(aiResponse);
    } catch (parseError) {
      // If JSON parsing fails, return the raw response
      response = { rawResponse: aiResponse };
    }

    // Store the insight in database if userId is provided
    if (userId && type) {
      // Here you would save to your database using Prisma
      // Example:
      // await db.aIInsight.create({
      //   data: {
      //     userId,
      //     type: type.toUpperCase(),
      //     title: response.summary || 'AI Insight',
      //     content: JSON.stringify(response),
      //     confidence: response.confidence || 0.8,
      //   }
      // });
    }

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Insight Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate AI insight',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}