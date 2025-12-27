import React from 'react';

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
    icon?: React.ElementType;
}

export const ChartCard = ({ title, children, icon: Icon }: ChartCardProps) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[380px]">
        <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-2">
                {Icon && <Icon className="text-gray-400" size={14} />}
                <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
            </div>
        </div>
        <div className="flex-1 w-full min-h-0 p-5">
            {children}
        </div>
    </div>
);
