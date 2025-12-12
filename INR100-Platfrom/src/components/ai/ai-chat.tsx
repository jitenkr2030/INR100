"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Lightbulb
} from "lucide-react";

interface AIChatProps {
  userId?: string;
  context?: {
    portfolio?: any;
    riskProfile?: string;
    investmentGoals?: string[];
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AIChat({ userId, context }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI financial assistant. I can help you with investment advice, portfolio analysis, market insights, and financial education. What would you like to know today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my portfolio",
        "What are the best investment options right now?",
        "Explain mutual funds",
        "How to diversify my investments?"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    { 
      icon: TrendingUp, 
      label: "Portfolio Analysis", 
      query: "Can you analyze my current portfolio and give me suggestions for improvement?" 
    },
    { 
      icon: Target, 
      label: "Investment Ideas", 
      query: "What are some good investment opportunities for someone with moderate risk tolerance?" 
    },
    { 
      icon: AlertTriangle, 
      label: "Risk Assessment", 
      query: "Help me understand the risks in my current investment strategy" 
    },
    { 
      icon: Lightbulb, 
      label: "Financial Education", 
      query: "Explain the difference between stocks and mutual funds" 
    }
  ];

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          userId,
          context
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          suggestions: generateSuggestions(data.response)
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSuggestions = (response: string): string[] => {
    // Generate contextual suggestions based on the AI's response
    const suggestions = [];
    
    if (response.toLowerCase().includes('portfolio')) {
      suggestions.push("Show me my portfolio performance", "How to rebalance portfolio?");
    }
    if (response.toLowerCase().includes('risk')) {
      suggestions.push("What is my risk profile?", "How to reduce investment risk?");
    }
    if (response.toLowerCase().includes('mutual fund')) {
      suggestions.push("Best mutual funds for SIP", "How to choose mutual funds?");
    }
    if (response.toLowerCase().includes('stock')) {
      suggestions.push("Top stocks to buy", "How to analyze stocks?");
    }
    
    // Default suggestions if no context-specific ones are generated
    if (suggestions.length === 0) {
      suggestions.push("Tell me more", "Give me examples", "What's the next step?");
    }
    
    return suggestions.slice(0, 3);
  };

  const handleQuickAction = (query: string) => {
    handleSend(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="border-0 shadow-lg h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>AI Financial Assistant</span>
          <Badge className="bg-blue-100 text-blue-800">
            <Sparkles className="h-3 w-3 mr-1" />
            Beta
          </Badge>
        </CardTitle>
        <CardDescription>
          Get personalized investment advice and insights powered by AI
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-b">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto p-3 flex flex-col items-center space-y-1 text-xs"
                      onClick={() => handleQuickAction(action.query)}
                    >
                      <action.icon className="h-4 w-4" />
                      <span className="text-center">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === 'assistant' && (
                          <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <div className="text-xs opacity-70 mt-1">
                            {formatTime(message.timestamp)}
                          </div>
                          
                          {/* Suggestions */}
                          {message.suggestions && message.role === 'assistant' && (
                            <div className="mt-3 space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-1 text-xs justify-start text-blue-600 hover:text-blue-700"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.role === 'user' && (
                          <User className="h-4 w-4 mt-0.5 text-blue-200" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about investments, portfolio, or financial advice..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="flex-1 m-0 p-4">
            <div className="text-center text-gray-500 py-8">
              <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>AI-powered insights will appear here based on your portfolio and market conditions.</p>
              <Button variant="outline" className="mt-4">
                Generate Insights
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}