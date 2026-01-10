import { ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  schoolName?: string;
}

export default function VerifiedBadge({ schoolName }: VerifiedBadgeProps) {
  // FIX: Đã xóa thuộc tính title="Trường học?" để không hiện tooltip khi hover
  return (
    <div className="bg-white text-emerald-500 rounded-full flex items-center justify-center">
      <ShieldCheck size={14} fill="white" className="text-emerald-500" />
    </div>
  );
}