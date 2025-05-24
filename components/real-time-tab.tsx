"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const realTimeData = {
  currentPrice: 428.67,
  dailyChange: 2.34,
  dailyChangePercent: 0.55,
}

const priceData = [
  { date: "2024-04-10", price: 410.15 },
  { date: "2024-04-11", price: 412.3 },
  { date: "2024-04-12", price: 409.85 },
  { date: "2024-04-13", price: 415.6 },
  { date: "2024-04-14", price: 413.45 },
  { date: "2024-04-15", price: 417.2 },
  { date: "2024-04-16", price: 414.8 },
  { date: "2024-04-17", price: 419.15 },
  { date: "2024-04-18", price: 416.9 },
  { date: "2024-04-19", price: 421.25 },
  { date: "2024-04-20", price: 418.67 },
  { date: "2024-04-21", price: 420.15 },
  { date: "2024-04-22", price: 422.3 },
  { date: "2024-04-23", price: 419.85 },
  { date: "2024-04-24", price: 425.6 },
  { date: "2024-04-25", price: 423.45 },
  { date: "2024-04-26", price: 427.2 },
  { date: "2024-04-27", price: 424.8 },
  { date: "2024-04-28", price: 429.15 },
  { date: "2024-04-29", price: 426.9 },
  { date: "2024-04-30", price: 431.25 },
  { date: "2024-05-01", price: 428.67 },
  { date: "2024-05-02", price: 430.15 },
  { date: "2024-05-03", price: 432.3 },
  { date: "2024-05-04", price: 429.85 },
  { date: "2024-05-05", price: 435.6 },
  { date: "2024-05-06", price: 433.45 },
  { date: "2024-05-07", price: 437.2 },
  { date: "2024-05-08", price: 434.8 },
  { date: "2024-05-09", price: 439.15 },
  { date: "2024-05-10", price: 436.9 },
  { date: "2024-05-11", price: 441.25 },
  { date: "2024-05-12", price: 438.67 },
  { date: "2024-05-13", price: 440.15 },
  { date: "2024-05-14", price: 442.3 },
  { date: "2024-05-15", price: 439.85 },
  { date: "2024-05-16", price: 445.6 },
  { date: "2024-05-17", price: 443.45 },
  { date: "2024-05-18", price: 447.2 },
  { date: "2024-05-19", price: 444.8 },
  { date: "2024-05-20", price: 449.15 },
  { date: "2024-05-21", price: 446.9 },
  { date: "2024-05-22", price: 451.25 },
  { date: "2024-05-23", price: 448.67 },
]

const etfOptions = [
  { symbol: "SPY", name: "SPDR S&P 500 ETF Trust" },
  { symbol: "QQQ", name: "Invesco QQQ Trust" },
  { symbol: "VTI", name: "Vanguard Total Stock Market ETF" },
  { symbol: "IWM", name: "iShares Russell 2000 ETF" },
  { symbol: "EFA", name: "iShares MSCI EAFE ETF" },
  { symbol: "VEA", name: "Vanguard FTSE Developed Markets ETF" },
  { symbol: "ARKK", name: "ARK Innovation ETF" },
  { symbol: "VGT", name: "Vanguard Information Technology ETF" },
]

export default function RealTimeTab() {
  const isPositive = realTimeData.dailyChangePercent > 0
  const [selectedETF, setSelectedETF] = useState("SPY")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEtfs = etfOptions.filter(
    (etf) =>
      etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etf.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Select onValueChange={setSelectedETF}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an ETF" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Search ETFs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              {filteredEtfs.map((etf) => (
                <SelectItem key={etf.symbol} value={etf.symbol}>
                  {etf.name} ({etf.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Real-time KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardDescription>Current Price (Adjusted Close)</CardDescription>
            <CardTitle className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              ${realTimeData.currentPrice.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">As of market close</p>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br ${isPositive ? "from-green-500/10 to-green-600/5 border-green-200 dark:border-green-800" : "from-red-500/10 to-red-600/5 border-red-200 dark:border-red-800"}`}
        >
          <CardHeader className="pb-2">
            <CardDescription>Daily Change</CardDescription>
            <CardTitle
              className={`text-3xl font-bold flex items-center gap-2 ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {isPositive ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
              {isPositive ? "+" : ""}${realTimeData.dailyChange.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">1-day price movement</p>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br ${isPositive ? "from-green-500/10 to-green-600/5 border-green-200 dark:border-green-800" : "from-red-500/10 to-red-600/5 border-red-200 dark:border-red-800"}`}
        >
          <CardHeader className="pb-2">
            <CardDescription>Daily Change %</CardDescription>
            <CardTitle
              className={`text-3xl font-bold flex items-center gap-2 ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {isPositive ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
              {isPositive ? "+" : ""}
              {realTimeData.dailyChangePercent.toFixed(2)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Percentage change</p>
          </CardContent>
        </Card>
      </div>

      {/* Price Trend Chart - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle>45-Day Price Trend</CardTitle>
          <CardDescription>Adjusted closing prices for the last 45 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              price: { label: "Price", color: "hsl(var(--chart-1))" },
            }}
            className="h-[400px] w-full"
          >
            <LineChart data={priceData} width="100%" height={400}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval="preserveStartEnd"
              />
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} tick={{ fontSize: 12 }} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
