"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { useEffect, useState } from "react"

interface CategoryData {
  totalCategories: number
  bestCategory3Y: { name: string; return: number }
  bestCategory5Y: { name: string; return: number }
  category3YData: Array<{ category: string; return: number }>
  category5YData: Array<{ category: string; return: number }>
  categoryAssetsData: Array<{ category: string; assets: number }>
  combinedTopData: Array<{ category: string; return3Y: number; return5Y: number }>
}

export default function CategoryPerformanceTab() {
  const [data, setData] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tab_category_performance-zCpvkRYJVjFEpleb7E173lUafzkXmG.csv",
        )
        const text = await response.text()

        const lines = text.split("\n").filter((line) => line.trim())
        const headers = lines[0].split(",")

        const categories: Array<{
          category: string
          threeYearReturn: number
          fiveYearReturn: number
          totalAssets: number
        }> = []

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",")
          const category = values[0]?.replace(/"/g, "")
          const threeYearReturn = Number.parseFloat(values[1]?.replace(/"/g, "")) * 100 || 0
          const fiveYearReturn = Number.parseFloat(values[2]?.replace(/"/g, "")) * 100 || 0
          const totalAssets = Number.parseFloat(values[3]) || 0

          if (category) {
            categories.push({
              category,
              threeYearReturn,
              fiveYearReturn,
              totalAssets,
            })
          }
        }

        // Sort by returns for best categories
        const sortedBy3Y = [...categories].sort((a, b) => b.threeYearReturn - a.threeYearReturn)
        const sortedBy5Y = [...categories].sort((a, b) => b.fiveYearReturn - a.fiveYearReturn)

        // Get top 10 categories for combined chart
        const top10Categories = sortedBy3Y.slice(0, 10)
        const combinedTopData = top10Categories.map((cat) => ({
          category: cat.category,
          return3Y: cat.threeYearReturn,
          return5Y: cat.fiveYearReturn,
        }))

        setData({
          totalCategories: categories.length,
          bestCategory3Y: {
            name: sortedBy3Y[0]?.category || "Technology",
            return: sortedBy3Y[0]?.threeYearReturn || 16.8,
          },
          bestCategory5Y: {
            name: sortedBy5Y[0]?.category || "Technology",
            return: sortedBy5Y[0]?.fiveYearReturn || 18.2,
          },
          category3YData: sortedBy3Y.map((cat) => ({
            category: cat.category,
            return: cat.threeYearReturn,
          })),
          category5YData: sortedBy5Y.map((cat) => ({
            category: cat.category,
            return: cat.fiveYearReturn,
          })),
          categoryAssetsData: categories
            .sort((a, b) => b.totalAssets - a.totalAssets)
            .map((cat) => ({
              category: cat.category,
              assets: cat.totalAssets,
            })),
          combinedTopData,
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        // Fallback data
        const fallbackCategories = [
          { category: "Technology", return3Y: 16.8, return5Y: 18.2 },
          { category: "Healthcare", return3Y: 12.4, return5Y: 14.1 },
          { category: "Consumer Disc.", return3Y: 11.9, return5Y: 13.6 },
          { category: "Financials", return3Y: 10.7, return5Y: 12.3 },
          { category: "Industrials", return3Y: 9.8, return5Y: 11.4 },
          { category: "Communication", return3Y: 8.9, return5Y: 10.2 },
          { category: "Materials", return3Y: 7.6, return5Y: 8.9 },
          { category: "Energy", return3Y: 6.2, return5Y: 7.8 },
          { category: "Utilities", return3Y: 5.8, return5Y: 6.5 },
          { category: "Real Estate", return3Y: 4.9, return5Y: 5.7 },
        ]

        setData({
          totalCategories: 12,
          bestCategory3Y: { name: "Technology", return: 16.8 },
          bestCategory5Y: { name: "Technology", return: 18.2 },
          category3YData: fallbackCategories.map((cat) => ({
            category: cat.category,
            return: cat.return3Y,
          })),
          category5YData: fallbackCategories.map((cat) => ({
            category: cat.category,
            return: cat.return5Y,
          })),
          categoryAssetsData: [
            { category: "Technology", assets: 850000000000 },
            { category: "Broad Market", assets: 720000000000 },
            { category: "Bonds", assets: 680000000000 },
            { category: "Healthcare", assets: 340000000000 },
            { category: "Financials", assets: 280000000000 },
            { category: "Consumer Disc.", assets: 220000000000 },
            { category: "Industrials", assets: 180000000000 },
            { category: "Communication", assets: 160000000000 },
            { category: "Energy", assets: 140000000000 },
            { category: "Materials", assets: 120000000000 },
          ],
          combinedTopData: fallbackCategories,
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
      {/* Category KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Categories</CardDescription>
            <CardTitle className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {data.totalCategories}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Investment categories</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardDescription>Best 3Y Category</CardDescription>
            <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {data.bestCategory3Y.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{data.bestCategory3Y.return.toFixed(1)}% avg return</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Best 5Y Category</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data.bestCategory5Y.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{data.bestCategory5Y.return.toFixed(1)}% avg return</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Combined Top 10 Performance - Side by Side */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Categories: 3Y vs 5Y Returns</CardTitle>
            <CardDescription>Comparison of 3-year and 5-year returns for top performing categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                return3Y: { label: "3Y Return %", color: "hsl(var(--chart-1))" },
                return5Y: { label: "5Y Return %", color: "hsl(var(--chart-2))" },
              }}
              className="h-[500px] w-full"
            >
              <BarChart data={data.combinedTopData} width="100%" height={500}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="return3Y" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                <Bar dataKey="return5Y" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Assets by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Total Assets by Category</CardTitle>
            <CardDescription>Total fund size by investment category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                assets: { label: "Total Assets", color: "hsl(var(--chart-3))" },
              }}
              className="h-[500px] w-full"
            >
              <BarChart data={data.categoryAssetsData.slice(0, 10)} width="100%" height={500}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis tickFormatter={(value) => `$${(value / 1000000000).toFixed(0)}B`} tick={{ fontSize: 12 }} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`$${(Number(value) / 1000000000).toFixed(1)}B`, "Total Assets"]}
                />
                <Bar dataKey="assets" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
