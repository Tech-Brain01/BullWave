import React, { useRef, useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const PortfolioOverviewChart = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        const createGradient = (ctx) => {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            return gradient;
        };

        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const dataPoints = [65000, 59000, 80000, 81000, 56000, 55000, 90000];

        setChartData({
            labels,
            datasets: [
                {
                    fill: true,
                    label: 'Portfolio Value',
                    data: dataPoints,
                    borderColor: '#3B82F6',
                    backgroundColor: createGradient(chart.ctx),
                    tension: 0.4,
                    // --- POINT STYLE UPDATE ---
                    // These properties make the points visible and interactive
                    pointBorderColor: '#3B82F6',
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 4, // This makes the points visible by default
                    pointHoverRadius: 8, // Makes the point larger on hover
                },
            ],
        });
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'hsl(var(--popover))',
                titleColor: '#FFFFFF',
                bodyColor: 'hsl(var(--popover-foreground))',
                padding: 12,
                borderColor: 'hsl(var(--border))',
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                    label: (context) => `Value: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y)}`
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#9CA3AF' },
                grid: { color: 'hsl(var(--border) / 0.5)' }
            },
            y: {
                ticks: { color: '#9CA3AF' },
                grid: { color: 'hsl(var(--border) / 0.5)' }
            }
        }
    };

    return <Line ref={chartRef} options={options} data={chartData} />;
}

export default PortfolioOverviewChart;