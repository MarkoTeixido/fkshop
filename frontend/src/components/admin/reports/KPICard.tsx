import { KPI } from "@/types/report.types";

export const KPICard = ({ kpi }: { kpi: KPI }) => (
    <div className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-all cursor-default relative overflow-hidden">
        <div className="relative z-10 w-full">
            <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <kpi.icon size={16} />
                </div>
                {kpi.trend === 'up' && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ +12%</span>}
            </div>
            <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{kpi.title}</p>
                <h3 className="text-xl font-black text-dark-bg tracking-tight mb-1">{kpi.value}</h3>
                <p className="text-gray-400 text-[10px] font-medium">{kpi.subtitle}</p>
            </div>
        </div>
    </div>
);
