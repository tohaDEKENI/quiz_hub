import React from 'react';

export default function Skeleton() {
    return (
        <div className="w-full h-auto bg-white rounded-xl overflow-hidden shadow animate-pulse">

            <div className="h-32 bg-gradient-to-r from-orange-400 to-purple-500 flex items-center justify-center relative">
                <div className="w-10 h-10 bg-white/20 rounded-full" />
                <div className="absolute top-2 right-2 w-12 h-5 bg-black/20 rounded"></div>
            </div>

            <div className="p-4 space-y-2">

                <div className="h-4 bg-gray-300 rounded w-3/4"></div>

                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                <div className="flex items-center justify-between mt-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-red-300 rounded-full w-16"></div>
                </div>
            </div>
        </div>
    );
}
