import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ChartCard } from './ChartCard';
import { FaChartLine } from "react-icons/fa6";

interface RevenueChartProps {
    data: any[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <ChartCard title="Ingresos Recientes" icon={FaChartLine}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.05} />
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                        cursor={{ stroke: '#dc2626', strokeWidth: 1, strokeDasharray: '4 4' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '8px', fontSize: '12px' }}
                        formatter={(value: any) => [`$${parseFloat(value || 0).toFixed(2)}`, 'Venta']}
                    />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#dc2626"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        activeDot={{ r: 4, strokeWidth: 0, fill: '#dc2626' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
