"use client"
import { Moon, Sun, TrendingUp, BarChart3, Newspaper, Zap, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import OverviewTab from "@/components/overview-tab"
import NewsSentimentTab from "@/components/news-sentiment-tab"
import RealTimeTab from "@/components/real-time-tab"
import TopPerformersTab from "@/components/top-performers-tab"
import CategoryPerformanceTab from "@/components/category-performance-tab"

export default function ETFDashboard() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">ETF Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">Comprehensive ETF performance and market analysis</p>
          </div>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="news-sentiment" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              News Sentiment
            </TabsTrigger>
            <TabsTrigger value="real-time" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Real Time
            </TabsTrigger>
            <TabsTrigger value="top-performers" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Top Performers
            </TabsTrigger>
            <TabsTrigger value="category-performance" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Category Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="news-sentiment">
            <NewsSentimentTab />
          </TabsContent>

          <TabsContent value="real-time">
            <RealTimeTab />
          </TabsContent>

          <TabsContent value="top-performers">
            <TopPerformersTab />
          </TabsContent>

          <TabsContent value="category-performance">
            <CategoryPerformanceTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
