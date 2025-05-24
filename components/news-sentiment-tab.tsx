"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell } from "recharts"

const topicSentimentData = [
  { topic: "Market Volatility", sentiment: -0.3 },
  { topic: "Tech Sector", sentiment: 0.6 },
  { topic: "Interest Rates", sentiment: -0.1 },
  { topic: "Inflation", sentiment: -0.4 },
  { topic: "Economic Growth", sentiment: 0.4 },
  { topic: "Geopolitical", sentiment: -0.2 },
]

const etfSentimentData = [
  { etf: "SPY", sentiment: 0.3 },
  { etf: "QQQ", sentiment: 0.7 },
  { etf: "VTI", sentiment: 0.2 },
  { etf: "IWM", sentiment: -0.1 },
  { etf: "EFA", sentiment: 0.1 },
  { etf: "VEA", sentiment: 0.4 },
  { etf: "IEMG", sentiment: -0.2 },
  { etf: "BND", sentiment: -0.3 },
]

const getSentimentColor = (sentiment: number) => {
  if (sentiment > 0.3) return "#8b5cf6" // purple
  if (sentiment > 0) return "#a78bfa" // light purple
  if (sentiment > -0.3) return "#c4b5fd" // lighter purple
  return "#ddd6fe" // lightest purple
}

export default function NewsSentimentTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Topic Sentiment - Now Vertical */}
        <Card>
          <CardHeader>
            <CardTitle>News Sentiment by Topic</CardTitle>
            <CardDescription>Sentiment scores ranging from -1 (negative) to +1 (positive)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sentiment: { label: "Sentiment Score", color: "hsl(var(--chart-1))" },
              }}
              className="h-[400px] w-full"
            >
              <BarChart data={topicSentimentData} width="100%" height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} interval={0} />
                <YAxis domain={[-1, 1]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sentiment" radius={[4, 4, 0, 0]}>
                  {topicSentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSentimentColor(entry.sentiment)} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* ETF Sentiment - Now Vertical */}
        <Card>
          <CardHeader>
            <CardTitle>News Sentiment by ETF</CardTitle>
            <CardDescription>Individual ETF sentiment analysis from recent news</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sentiment: { label: "Sentiment Score", color: "hsl(var(--chart-2))" },
              }}
              className="h-[400px] w-full"
            >
              <BarChart data={etfSentimentData} width="100%" height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="etf" tick={{ fontSize: 12 }} interval={0} />
                <YAxis domain={[-1, 1]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sentiment" radius={[4, 4, 0, 0]}>
                  {etfSentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSentimentColor(entry.sentiment)} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-200 rounded"></div>
              <span className="text-sm">Very Negative (-1 to -0.3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-300 rounded"></div>
              <span className="text-sm">Negative (-0.3 to 0)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-400 rounded"></div>
              <span className="text-sm">Positive (0 to 0.3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm">Very Positive (0.3 to 1)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
