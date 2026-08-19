import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Zap, 
  MapPin, 
  Box, 
  Home, 
  ShoppingBag, 
  BarChart3,
  Building,
  PieChart,
  AlertCircle,
  ChevronRight
} from "lucide-react";

// Custom Components with Professional Styling
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Badge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-700",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// --- Mock Portfolio Data ---
const portfolioMetrics = [
  { 
    label: "Total Return", 
    value: "+₹92.5L", 
    description: "Lifetime returns",
    icon: TrendingUp, 
    color: "text-green-600",
    trend: "+14.2%"
  },
  { 
    label: "Annual Return", 
    value: "14.2%", 
    description: "Last 12 months",
    icon: Target, 
    color: "text-blue-600",
    trend: "+2.1%"
  },
  { 
    label: "Invested Capital", 
    value: "₹6.5Cr", 
    description: "Total investment",
    icon: DollarSign, 
    color: "text-purple-600",
    trend: "Stable"
  },
  { 
    label: "Rental Yield", 
    value: "4.8%", 
    description: "Current yield",
    icon: Zap, 
    color: "text-yellow-600",
    trend: "+0.3%"
  },
];

const assetAllocation = [
  { type: "Apartment", value: 45, color: "#3b82f6", icon: Home },
  { type: "Row House", value: 30, color: "#14b8a6", icon: Building },
  { type: "Plot", value: 15, color: "#f59e0b", icon: MapPin },
  { type: "Commercial", value: 10, color: "#ef4444", icon: ShoppingBag },
];

const geographicalDiversification = [
  { city: "Mumbai, MH", percentage: 50, trend: "+5.2%" },
  { city: "Bangalore, KA", percentage: 30, trend: "+8.1%" },
  { city: "Gurgaon, HR", percentage: 20, trend: "+3.4%" },
];

const monthlyPerformance = [
  { month: "Jan", gain: 0.5, isPositive: true },
  { month: "Feb", gain: 1.2, isPositive: true },
  { month: "Mar", gain: 0.8, isPositive: true },
  { month: "Apr", gain: 1.5, isPositive: true },
  { month: "May", gain: -0.3, isPositive: false },
  { month: "Jun", gain: 1.9, isPositive: true },
  { month: "Jul", gain: 1.0, isPositive: true },
  { month: "Aug", gain: 0.6, isPositive: true },
];

const historicalGrowth = [
  { year: '2020', value: 100, amount: '₹4.5 Cr' },
  { year: '2021', value: 110, amount: '₹4.95 Cr' },
  { year: '2022', value: 125, amount: '₹5.62 Cr' },
  { year: '2023', value: 135, amount: '₹6.07 Cr' },
  { year: '2024', value: 150, amount: '₹6.75 Cr' },
];

// Metric Card Component
const MetricCard = ({ title, value, description, icon: Icon, trend, className = "" }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${
              trend.includes('+') ? 'text-green-600' : trend.includes('-') ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend}
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Asset Allocation Chart
const AssetAllocationChart = () => {
  const totalRadius = 80;
  const innerRadius = 50;
  let currentAngle = 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>Portfolio distribution by property type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Chart */}
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
              {assetAllocation.map((asset, index) => {
                const angle = (asset.value / 100) * 360;
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const x1 = 80 + totalRadius * Math.cos(currentAngle * Math.PI / 180);
                const y1 = 80 + totalRadius * Math.sin(currentAngle * Math.PI / 180);
                
                const x2 = 80 + totalRadius * Math.cos((currentAngle + angle) * Math.PI / 180);
                const y2 = 80 + totalRadius * Math.sin((currentAngle + angle) * Math.PI / 180);
                
                const innerX1 = 80 + innerRadius * Math.cos(currentAngle * Math.PI / 180);
                const innerY1 = 80 + innerRadius * Math.sin(currentAngle * Math.PI / 180);
                
                const innerX2 = 80 + innerRadius * Math.cos((currentAngle + angle) * Math.PI / 180);
                const innerY2 = 80 + innerRadius * Math.sin((currentAngle + angle) * Math.PI / 180);
                
                const path = `M ${innerX1} ${innerY1} 
                             L ${x1} ${y1} 
                             A ${totalRadius} ${totalRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                             L ${innerX2} ${innerY2} 
                             A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1} Z`;
                
                const segment = (
                  <path
                    key={asset.type}
                    d={path}
                    fill={asset.color}
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  />
                );
                
                currentAngle += angle;
                return segment;
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">100%</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {assetAllocation.map((asset) => (
              <div key={asset.type} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="font-medium text-gray-700">{asset.type}</span>
                </div>
                <span className="font-semibold text-gray-900">{asset.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Performance Chart
const PerformanceChart = () => {
  const maxGain = Math.max(...monthlyPerformance.map(d => Math.abs(d.gain)));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Performance</CardTitle>
        <CardDescription>Year-over-year change in portfolio value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <div className="flex items-end justify-between h-48 space-x-2">
            {monthlyPerformance.map((month) => {
              const height = (Math.abs(month.gain) / maxGain) * 80;
              return (
                <div key={month.month} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-full rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer ${
                      month.isPositive 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div className="mt-2 text-xs text-gray-600 font-medium">
                    {month.month}
                  </div>
                  <div className={`text-xs font-semibold mt-1 ${
                    month.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {month.gain > 0 ? '+' : ''}{month.gain}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Geographical Diversification
const GeographicalDiversification = () => (
  <Card>
    <CardHeader>
      <CardTitle>Geographical Distribution</CardTitle>
      <CardDescription>Portfolio allocation across cities</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {geographicalDiversification.map((city) => (
          <div key={city.city}>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">{city.city}</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{city.percentage}%</span>
                <Badge variant="success" className="text-xs">
                  {city.trend}
                </Badge>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-1000"
                style={{ width: `${city.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Historical Growth
const HistoricalGrowth = () => {
  const minValue = Math.min(...historicalGrowth.map(d => d.value));
  const maxValue = Math.max(...historicalGrowth.map(d => d.value));
  const valueRange = maxValue - minValue;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Growth</CardTitle>
        <CardDescription>Portfolio value trend since 2020</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 border-l border-b border-gray-300">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute w-full border-t border-dashed border-gray-200"
                style={{ top: `${percent}%` }}
              />
            ))}
          </div>

          {/* Line chart */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path
              d={historicalGrowth.map((point, index) => {
                const x = (index / (historicalGrowth.length - 1)) * 100;
                const y = 100 - ((point.value - minValue) / valueRange) * 100;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Data points */}
          <div className="absolute inset-0">
            {historicalGrowth.map((point, index) => {
              const x = (index / (historicalGrowth.length - 1)) * 100;
              const y = 100 - ((point.value - minValue) / valueRange) * 100;
              
              return (
                <div
                  key={point.year}
                  className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
                  <div className="mt-6 text-center">
                    <div className="text-xs font-semibold text-gray-900 bg-white px-2 py-1 rounded border shadow-sm">
                      {point.amount}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{point.year}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Recommendations Card
const RecommendationsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Portfolio Recommendations</CardTitle>
      <CardDescription>Optimize your investment strategy</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Increase Commercial Exposure</p>
            <p className="text-sm text-gray-600 mt-1">
              Your commercial property allocation is low (10%). Consider adding 15-20% for balanced growth.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Explore Pune Market</p>
            <p className="text-sm text-gray-600 mt-1">
              Pune market shows high growth potential. Consider diversifying into this region.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Excellent Performance</p>
            <p className="text-sm text-gray-600 mt-1">
              Your 14.2% annual return exceeds the regional average of 11.5%.
            </p>
          </div>
        </div>
        
        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
          View Recommended Properties
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </CardContent>
  </Card>
);

// Main Portfolio Component
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h1>
        <p className="text-gray-600 mt-1">
          Comprehensive analysis of your real estate investments and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {portfolioMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.label}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AssetAllocationChart />
        <PerformanceChart />
      </div>

      {/* Historical Growth */}
      <div className="mb-8">
        <HistoricalGrowth />
      </div>

      {/* Risk & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeographicalDiversification />
        <RecommendationsCard />
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          Analytics powered by Edge Expert Data Engine • Updated today
        </p>
      </div>
    </div>
  );
}