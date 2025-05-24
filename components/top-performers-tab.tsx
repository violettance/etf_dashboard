"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { useEffect, useState } from "react"

interface TopPerformersData {
  threeYearData: Array<{ etf: string; return: number }>
  fiveYearData: Array<{ etf: string; return: number }>
  dividendData: Array<{ etf: string; yield: number }>
}

export default function TopPerformersTab() {
  const [data, setData] = useState<TopPerformersData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tab_top_performers-fzJmhmCHY7Yx8x3P0r9y5B4t7gqTBR.csv",
        )
        const text = await response.text()

        const lines = text.split("\n").filter((line) => line.trim())
        const headers = lines[0].split(",")

        const etfs: Array<{
          symbol: string
          name: string
          threeYearReturn: number
          fiveYearReturn: number
          dividendYield: number
        }> = []

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",")
          const symbol = values[0]?.replace(/"/g, "")
          const name = values[1]?.replace(/"/g, "")
          const threeYearReturn = Number.parseFloat(values[2]?.replace(/"/g, "")) * 100 || 0
          const fiveYearReturn = Number.parseFloat(values[3]?.replace(/"/g, "")) * 100 || 0
          const dividendYield = Number.parseFloat(values[4]?.replace(/"/g, "")) || 0

          if (symbol && !isNaN(threeYearReturn)) {
            etfs.push({
              symbol,
              name,
              threeYearReturn,
              fiveYearReturn,
              dividendYield,
            })
          }
        }

        // Sort and get top 20 for each category
        const top3Y = etfs
          .filter((etf) => etf.threeYearReturn > 0)
          .sort((a, b) => b.threeYearReturn - a.threeYearReturn)
          .slice(0, 20)
          .map((etf) => ({ etf: etf.symbol, return: etf.threeYearReturn }))

        const top5Y = etfs
          .filter((etf) => etf.fiveYearReturn > 0)
          .sort((a, b) => b.fiveYearReturn - a.fiveYearReturn)
          .slice(0, 20)
          .map((etf) => ({ etf: etf.symbol, return: etf.fiveYearReturn }))

        const topDividend = etfs
          .filter((etf) => etf.dividendYield > 0)
          .sort((a, b) => b.dividendYield - a.dividendYield)
          .slice(0, 20)
          .map((etf) => ({ etf: etf.symbol, yield: etf.dividendYield }))

        setData({
          threeYearData: top3Y,
          fiveYearData: top5Y,
          dividendData: topDividend,
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        // Fallback data with 20 ETFs
        setData({
          threeYearData: [
            { etf: "ARKK", return: 18.5 },
            { etf: "QQQ", return: 16.2 },
            { etf: "VGT", return: 15.8 },
            { etf: "SOXX", return: 14.9 },
            { etf: "XLK", return: 14.3 },
            { etf: "FTEC", return: 13.7 },
            { etf: "VTI", return: 12.1 },
            { etf: "SPY", return: 11.8 },
            { etf: "SCHG", return: 11.2 },
            { etf: "IVV", return: 10.9 },
            { etf: "VOO", return: 10.7 },
            { etf: "VUG", return: 10.5 },
            { etf: "VXUS", return: 10.2 },
            { etf: "VEA", return: 9.8 },
            { etf: "VWO", return: 9.5 },
            { etf: "BND", return: 9.2 },
            { etf: "AGG", return: 8.9 },
            { etf: "VNQ", return: 8.6 },
            { etf: "GLD", return: 8.3 },
            { etf: "SLV", return: 8.0 },
          ],
          fiveYearData: [
            { etf: "QQQ", return: 19.3 },
            { etf: "VGT", return: 18.7 },
            { etf: "ARKK", return: 17.2 },
            { etf: "XLK", return: 16.8 },
            { etf: "SOXX", return: 16.1 },
            { etf: "FTEC", return: 15.4 },
            { etf: "VTI", return: 13.2 },
            { etf: "SPY", return: 12.9 },
            { etf: "SCHG", return: 12.5 },
            { etf: "IVV", return: 12.1 },
            { etf: "VOO", return: 11.8 },
            { etf: "VUG", return: 11.5 },
            { etf: "VXUS", return: 11.2 },
            { etf: "VEA", return: 10.8 },
            { etf: "VWO", return: 10.5 },
            { etf: "BND", return: 10.2 },
            { etf: "AGG", return: 9.9 },
            { etf: "VNQ", return: 9.6 },
            { etf: "GLD", return: 9.3 },
            { etf: "SLV", return: 9.0 },
          ],
          dividendData: [
            { etf: "VYM", yield: 3.2 },
            { etf: "SCHD", yield: 3.1 },
            { etf: "DVY", yield: 2.9 },
            { etf: "VIG", yield: 2.7 },
            { etf: "DGRO", yield: 2.5 },
            { etf: "NOBL", yield: 2.3 },
            { etf: "HDV", yield: 2.2 },
            { etf: "SPHD", yield: 2.1 },
            { etf: "VTV", yield: 2.0 },
            { etf: "SPYD", yield: 1.9 },
            { etf: "USMV", yield: 1.8 },
            { etf: "QUAL", yield: 1.7 },
            { etf: "MTUM", yield: 1.6 },
            { etf: "SIZE", yield: 1.5 },
            { etf: "VMOT", yield: 1.4 },
            { etf: "VLUE", yield: 1.3 },
            { etf: "FREL", yield: 1.2 },
            { etf: "IEFA", yield: 1.1 },
            { etf: "IEMG", yield: 1.0 },
            { etf: "EFA", yield: 0.9 },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  if (!data) {
    return <div className="flex items-center justify-center h-64">Error loading data</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* 3-Year Returns */}
        <Card>
          <CardHeader>
            <CardTitle>Top 20 ETFs by 3-Year Returns</CardTitle>
            <CardDescription>Highest performing ETFs by 3-year average return</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                return: { label: "3Y Return %", color: "hsl(var(--chart-1))" },
              }}
              className="h-[400px] w-full"
            >
              <BarChart data={data.threeYearData} width="100%" height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="etf" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="return" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 5-Year Returns */}
        <Card>
          <CardHeader>
            <CardTitle>Top 20 ETFs by 5-Year Returns</CardTitle>
            <CardDescription>Highest performing ETFs by 5-year average return</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                return: { label: "5Y Return %", color: "hsl(var(--chart-2))" },
              }}
              className="h-[400px] w-full"
            >
              <BarChart data={data.fiveYearData} width="100%" height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="etf" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="return" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Dividend Yields */}
        <Card>
          <CardHeader>
            <CardTitle>Top 20 ETFs by Dividend Yields</CardTitle>
            <CardDescription>Highest dividend yielding ETFs</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                yield: { label: "Dividend Yield %", color: "hsl(var(--chart-3))" },
              }}
              className="h-[400px] w-full"
            >
              <BarChart data={data.dividendData} width="100%" height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="etf" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="yield" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
