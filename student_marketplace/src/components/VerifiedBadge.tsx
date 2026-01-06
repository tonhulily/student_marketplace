import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function VerifiedBadge({ schoolName, className }: { schoolName: string; className?: string }) {
    const [showSchool, setShowSchool] = useState(false);

    return (
        <div className={cn("inline-flex items-center relative", className)}>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSchool(!showSchool);
                }}
                className="text-green-500 hover:text-green-600 transition-colors"
            >
                <ShieldCheck size={14} fill="currentColor" className="text-white" />
            </button>

            {showSchool && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap z-50 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                    {schoolName}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-gray-800"></div>
                </div>
            )}
        </div>
    );
}
