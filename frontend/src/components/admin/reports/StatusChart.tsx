import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import { FaBoxOpen } from "react-icons/fa6";

interface StatusChartProps {
    data: any[];
}

const COLORS = ['#1f2937', '#dc2626', '#9ca3af', '#e5e7eb', '#4b5563'];

export default function StatusChart({ data }: StatusChartProps) {
    return (
        <ChartCard title="Estado Pedidos" icon={FaBoxOpen}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        cornerRadius={4}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
