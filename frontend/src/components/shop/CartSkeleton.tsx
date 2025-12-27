export default function CartSkeleton() {
    return (
        <div className="bg-dark-bg min-h-screen flex flex-col">
            <main className="flex-grow pt-32 pb-20">
                <div className="container-custom">
                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                        <div>
                            <div className="h-12 w-64 bg-white/10 rounded-lg mb-2 animate-pulse"></div>
                            <div className="h-4 w-48 bg-white/5 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart List Skeleton */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="hidden md:flex justify-between px-6 mb-2">
                                <div className="h-4 w-20 bg-white/5 rounded"></div>
                                <div className="flex gap-20 pr-12">
                                    <div className="h-4 w-16 bg-white/5 rounded"></div>
                                    <div className="h-4 w-16 bg-white/5 rounded"></div>
                                </div>
                            </div>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-dark-surface p-4 rounded-xl border border-white/5 flex gap-4 animate-pulse">
                                    <div className="w-24 h-24 bg-white/5 rounded-lg shrink-0"></div>
                                    <div className="flex-grow space-y-3 py-2">
                                        <div className="h-6 w-1/2 bg-white/10 rounded"></div>
                                        <div className="h-4 w-1/4 bg-white/5 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Skeleton */}
                        <div className="lg:col-span-1">
                            <div className="bg-dark-surface p-6 rounded-2xl border border-white/10 animate-pulse h-[300px]">
                                <div className="h-8 w-1/2 bg-white/10 rounded mb-6"></div>
                                <div className="space-y-4">
                                    <div className="h-4 w-full bg-white/5 rounded"></div>
                                    <div className="h-4 w-full bg-white/5 rounded"></div>
                                    <div className="h-8 w-full bg-white/10 rounded mt-8"></div>
                                    <div className="h-12 w-full bg-primary/20 rounded-full mt-6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
