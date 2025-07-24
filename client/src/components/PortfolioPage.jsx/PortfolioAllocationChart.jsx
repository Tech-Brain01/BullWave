import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioAllocationChart = ({ portfolio }) => {
    // --- Sector Aggregation Logic ---
    const sectorData = portfolio?.holdings?.reduce((acc, holding) => {
        const sector = holding.sector || 'Other'; // Default sector if undefined
        const value = holding.quantity * holding.averageBuyPrice;
        if (!acc[sector]) {
            acc[sector] = 0;
        }
        acc[sector] += value;
        return acc;
    }, {});

    const data = {
        labels: sectorData ? Object.keys(sectorData) : [],
        datasets: [
            {
                label: 'Value',
                data: sectorData ? Object.values(sectorData) : [],
                backgroundColor: ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#ef4444', '#06b6d4'],
                borderColor: 'hsl(var(--card))',
                borderWidth: 4,
                hoverOffset: 8
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#E5E7EB', // Bright, readable text color
                    boxWidth: 15,
                    padding: 20,
                    font: { size: 14 }
                },
            },
            tooltip: {
                backgroundColor: 'hsl(var(--popover))',
                titleColor: '#FFFFFF',
                bodyColor: 'hsl(var(--popover-foreground))',
                padding: 12,
                callbacks: {
                    label: (context) => {
                        const total = context.chart.getDatasetMeta(0).total;
                        const value = context.parsed;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return ` ${percentage}% (${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)})`;
                    }
                }
            }
        },
    };

    return <Doughnut data={data} options={options} />;
}

export default PortfolioAllocationChart;