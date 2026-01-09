import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function VerifiedBadge({ schoolName, className }: { schoolName: string; className?: string }) {
    const [showSchool, setShowSchool] = useState(false);

    return (
        <div className={cn("inline-flex items-center relative group", className)}>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSchool(!showSchool);
                }}
                className="flex items-center gap-1 text-green-500 hover:text-green-600 transition-colors focus:outline-none"
                title="Đã xác thực (Nhấn để xem trường)"
            >
                <ShieldCheck size={16} fill="currentColor" className="text-white" />
                <span className="text-[10px] font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-200 hidden group-hover:block whitespace-nowrap">
                    Trường học?
                </span>
            </button>

            {showSchool && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-xl whitespace-nowrap z-[999] shadow-xl animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center">
                    <span className="font-bold">{schoolName}</span>
                    <div className="w-2 h-2 bg-gray-900 rotate-45 absolute -bottom-1"></div>
                </div>
            )}
        </div>
    );
}
