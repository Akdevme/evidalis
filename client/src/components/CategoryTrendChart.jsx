/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 */

import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { BarChart3, LineChart as LineIcon } from 'lucide-react';

// Register official Chart.js plugins including Subtitle
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  Filler
);

export const CategoryTrendChart = ({
  timelineData,
  categoryCounts,
  totalReviews,
}) => {
  const totalCount = totalReviews || Object.values(categoryCounts || {}).reduce((a, b) => a + (Number(b) || 0), 0) || 7001;
  // View mode: 'trend' | 'distribution'
  const [chartMode, setChartMode] = useState('distribution');
  const [hoveredLabel, setHoveredLabel] = useState(null);

  // Informative subtitle text powered by chartjs Subtitle plugin
  const dynamicSubtitle = useMemo(() => {
    if (hoveredLabel) {
      if (chartMode === 'distribution') {
        const count = categoryCounts?.[hoveredLabel] || 0;
        const pct = totalCount > 0 ? ((count / totalCount) * 100).toFixed(1) : 0;
        return `${hoveredLabel}: ${count.toLocaleString()} customer reviews (${pct}% of dataset)`;
      } else {
        return `Activity time window: ${hoveredLabel} • Incoming customer feedback`;
      }
    }

    if (chartMode === 'distribution') {
      return 'Category breakdown across verified customer feedback taxonomy';
    }

    return 'Real-time incoming feedback inflow and verified evidence lineage';
  }, [hoveredLabel, chartMode, categoryCounts, totalCount]);

  // Distribution Bar Chart Data in Warm Editorial Palette
  const categoriesList = ['Product Feedback', 'Customer Service', 'Fraud and Scam', 'Operational Issues'];
  const barDataValues = categoriesList.map((cat) => categoryCounts?.[cat] || 0);

  const barChartData = {
    labels: categoriesList,
    datasets: [
      {
        label: 'Verified CSV Feedback Entries',
        data: barDataValues,
        backgroundColor: [
          'rgba(113, 132, 154, 0.85)', // Slate Blue - Product Feedback
          'rgba(120, 132, 106, 0.85)', // Sage - Customer Service
          'rgba(200, 90, 90, 0.85)',   // Muted Terracotta Red - Fraud & Scam
          'rgba(166, 155, 137, 0.85)', // Greige/Wheat - Operational Issues
        ],
        borderColor: [
          '#71849A',
          '#78846A',
          '#C85A5A',
          '#A69B89',
        ],
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: [
          '#71849A',
          '#78846A',
          '#C85A5A',
          '#A69B89',
        ],
      },
    ],
  };

  // Trend Line Chart Data
  const lineLabels = timelineData?.labels || ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30'];
  const lineChartData = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Incoming Review Inflow',
        data: timelineData?.series1 || [24, 38, 29, 45, 34, 52, 61],
        borderColor: '#71849A', // Slate Blue
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(113, 132, 154, 0.20)');
          gradient.addColorStop(1, 'rgba(113, 132, 154, 0.00)');
          return gradient;
        },
        borderWidth: 2,
        pointBackgroundColor: '#71849A',
        pointBorderColor: '#FAF7F2',
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true,
      },
      {
        label: 'Evidence Verified Lineage',
        data: timelineData?.series2 || [18, 26, 22, 34, 25, 40, 48],
        borderColor: '#78846A', // Sage
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(120, 132, 106, 0.15)');
          gradient.addColorStop(1, 'rgba(120, 132, 106, 0.00)');
          return gradient;
        },
        borderWidth: 2,
        pointBackgroundColor: '#78846A',
        pointBorderColor: '#FAF7F2',
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  // Common Options with official Chart.js Subtitle plugin
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    onHover: (event, activeElements) => {
      if (activeElements && activeElements.length > 0) {
        const idx = activeElements[0].index;
        if (chartMode === 'distribution') {
          setHoveredLabel(categoriesList[idx]);
        } else {
          setHoveredLabel(lineLabels[idx]);
        }
      } else {
        setHoveredLabel(null);
      }
    },
    plugins: {
      legend: {
        display: chartMode === 'trend',
        position: 'top',
        align: 'end',
        labels: {
          color: '#45433D',
          font: { family: 'Inter, sans-serif', size: 11, weight: '500' },
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
        },
      },
      subtitle: {
        display: true,
        text: dynamicSubtitle,
        color: '#625D54',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: 'normal',
        },
        padding: {
          bottom: 12,
        },
        align: 'start',
      },
      tooltip: {
        backgroundColor: '#FAF7F2',
        titleColor: '#35332F',
        bodyColor: '#45433D',
        borderColor: '#C4BEB2',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        bodyFont: { family: 'Inter, sans-serif', size: 11 },
        titleFont: { family: 'Inter, sans-serif', size: 12, weight: '600' },
        callbacks: {
          afterTitle: (items) => {
            if (chartMode === 'distribution') {
              const cat = items[0]?.label;
              const count = categoryCounts?.[cat] || 0;
              const pct = totalCount > 0 ? ((count / totalCount) * 100).toFixed(1) : 0;
              return `${pct}% of total customer feedback volume`;
            }
            return 'Verified dataset activity';
          },
          label: (context) => {
            return ` Volume: ${context.parsed.y.toLocaleString()} customer reviews`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(196, 190, 178, 0.25)', drawBorder: false },
        ticks: {
          color: '#625D54',
          font: { family: 'Inter, sans-serif', size: 11 },
        },
      },
      y: {
        grid: { color: 'rgba(196, 190, 178, 0.25)', drawBorder: false },
        ticks: {
          color: '#6B655B',
          font: { family: 'Inter, sans-serif', size: 10 },
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Top Chart Controls - Fully Responsive on Mobile, Tablet & Desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#C4BEB2]/50 gap-2.5">
        <div className="flex items-center flex-wrap gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-[#35332F]">
            {chartMode === 'distribution' ? 'Feedback Distribution' : 'Activity Timeline'}
          </h3>
          <span className="text-xs text-[#6B655B] font-medium">
            ({totalCount.toLocaleString()} customer reviews)
          </span>
        </div>

        {/* Chart View Switcher: Distribution vs Timeline - Full Width on Mobile */}
        <div className="w-full sm:w-auto flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#C4BEB2] shadow-xs">
          <button
            onClick={() => setChartMode('distribution')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
              chartMode === 'distribution'
                ? 'bg-[#71849A] text-[#F4EFE6] shadow-xs font-bold'
                : 'text-[#625D54] hover:text-[#35332F]'
            }`}
            title="View category breakdown"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Breakdown</span>
          </button>
          <button
            onClick={() => setChartMode('trend')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
              chartMode === 'trend'
                ? 'bg-[#71849A] text-[#F4EFE6] shadow-xs font-bold'
                : 'text-[#625D54] hover:text-[#35332F]'
            }`}
            title="View activity timeline"
          >
            <LineIcon className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas with explicit relative bounds */}
      <div className="relative w-full h-64 sm:h-72 min-h-[240px]">
        {chartMode === 'distribution' ? (
          <Bar data={barChartData} options={options} />
        ) : (
          <Line data={lineChartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default CategoryTrendChart;
