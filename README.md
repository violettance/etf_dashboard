# ETF Analytics Dashboard

![ETF Dashboard Screenshot](image.png)

A modern, interactive dashboard for analyzing Exchange-Traded Funds (ETFs) performance, market trends, and sentiment analysis. Built with Next.js, TypeScript, and Tailwind CSS, this dashboard provides comprehensive insights into the ETF market.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Dashboard-blue?style=for-the-badge)](https://v0-data-dashboard-design-iota.vercel.app/)

## Features

### Overview
- Total ETF Trading Volume tracking
- Average 3-Year and 5-Year Returns analysis
- Dividend Yield Distribution visualization
- Trailing P/E Ratio Distribution analysis

### News Sentiment Analysis
- Topic-based sentiment analysis
- Individual ETF sentiment tracking
- Real-time sentiment scoring (-1 to +1)
- Visual sentiment indicators

### Real-Time Data
- Live ETF price tracking
- Daily price changes and percentage movements
- Historical price charts
- Searchable ETF selection

### Top Performers
- Top 20 ETFs by 3-Year Returns
- Top 20 ETFs by 5-Year Returns
- Top 20 ETFs by Dividend Yields
- Interactive performance charts

### Category Performance
- Sector-wise performance analysis
- Category-based asset distribution
- 3-Year and 5-Year category returns
- Combined performance metrics

## Data Sources

- **ETF Data**: Yahoo Finance (yfinance)
- **Real-time Data**: Alpha Vantage API
- **News Sentiment**: Alpha Vantage API

## Dataset Information

The dashboard analyzes data from 4,148 ETFs, including the following key metrics:

- Symbol and Long Name
- Category and Fund Family
- Total Assets and Net Assets
- Market Cap and Volume
- Average Volume
- Price Metrics (NAV, Previous Close, Open)
- Performance Metrics (3-Year and 5-Year Average Returns)
- Valuation Metrics (Trailing PE, Forward PE)
- Dividend Information (Yield, Last Dividend Value)

## Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Shadcn/ui
- **State Management**: React Hooks
- **Data Fetching**: Native Fetch API
- **Data Collection**: Python (yfinance, pandas)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/etf-dashboard.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Add your Alpha Vantage API key to `.env.local`:
```
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Keys Required

- Alpha Vantage API key for real-time data and news sentiment analysis
- Yahoo Finance API (no key required)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.