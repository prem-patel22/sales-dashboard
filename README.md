# Sales Analytics Dashboard

A comprehensive sales analytics dashboard built with Next.js, TypeScript, Tailwind CSS, and Recharts. Features interactive data visualization with multiple chart types and advanced filtering capabilities.

## 🚀 Features

### Core Features
- **Multiple Chart Types**: Bar, Line, and Pie charts using Recharts
- **Yearly Sales Data**: 2022, 2023, and 2024 sales data
- **Custom Filter Input**: Sales threshold filtering
- **API Integration**: Simulated real data fetching with loading states
- **Responsive Design**: Mobile-first responsive layout

### Advanced Features
- **Regional Analysis**: Sales breakdown by region (North, South, East, West)
- **Product Analysis**: Sales by product category (Electronics, Furniture, Clothing)
- **Advanced Filters**: Filter by region and product category
- **Multiple Visualization Types**: 
  - Regional data: Pie and Bar charts
  - Product data: Bar and Line charts
- **Loading States**: Elegant loading spinners during data fetch
- **Error Handling**: Comprehensive error handling for API calls

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts for interactive data visualization
- **State Management**: React hooks (useState, useEffect, useMemo)

## 📁 Project Structure

sales-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard page
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   └── page.tsx              # Landing page
│   ├── components/
│   │   ├── charts/
│   │   │   ├── SalesChart.tsx    # Main sales chart with filters
│   │   │   ├── RegionalChart.tsx # Regional sales visualization
│   │   │   ├── ProductChart.tsx  # Product sales visualization
│   │   │   ├── ChartSwitcher.tsx # Chart type selector
│   │   │   ├── FilterInput.tsx   # Sales threshold filter
│   │   │   ├── AdvancedFilters.tsx # Region and product filters
│   │   │   ├── AnalyticsOverview.tsx # Advanced analytics
│   │   │   └── ExportData.tsx    # Data export functionality
│   │   ├── ui/
│   │   │   ├── Card.tsx          # Reusable card component
│   │   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   │   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   │   │   └── RealTimeIndicator.tsx # Real-time status indicator
│   │   └── DashboardOverview.tsx # Additional chart overviews
│   ├── contexts/
│   │   └── ThemeContext.tsx      # Theme management context
│   ├── hooks/
│   │   ├── useWebSocket.ts       # Real-time updates hook
│   │   └── useDebounce.ts        # Performance optimization hook
│   └── lib/
│       ├── data.ts               # Mock data structure
│       ├── api.ts                # API simulation service
│       └── realApi.ts            # Real API service with JSON Server
├── public/                       # Static assets
├── db.json                       # JSON Server database
└── configuration files


## 📸 Features

🎯 Core Features
📊 Multiple Chart Types - Bar, Line, and Pie charts using Recharts

📈 Yearly Sales Data - Comprehensive data for 2022, 2023, and 2024

🔍 Advanced Filtering - Sales threshold, region, and product filters

⚡ Real API Integration - JSON Server with RESTful endpoints

🎨 Dark Mode Support - Complete theme switching with persistence

📤 Data Export - Export data as CSV or JSON

🔄 Real-time Updates - Simulated WebSocket connections

## 🛠 Technical Features

Atomic Design - Component-based architecture

Type Safety - Full TypeScript implementation

Responsive Design - Mobile-first responsive layout

Performance Optimized - Debounced filters and efficient rendering

Error Handling - Comprehensive error boundaries and loading states


## 🛠 Tech Stack

Framework: Next.js 15 with App Router

Language: TypeScript

Styling: Tailwind CSS

Charts: Recharts

API: JSON Server (REST API)

State Management: React Hooks

Icons: Emoji-based (no external dependencies)

## 📦 Installation & Setup

Prerequisites
Node.js 18+

npm or yarn