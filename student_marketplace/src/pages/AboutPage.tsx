import Header from "../components/Header";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Repeat, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Header />
      
      {/* Hero Intro */}
      <div className="bg-teal-600 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-6">Chợ sinh viên - Kết nối & Sẻ chia</h1>
            <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                Nền tảng mua bán đồ cũ an toàn, minh bạch dành riêng cho cộng đồng sinh viên các trường đại học tại Việt Nam.
            </p>
            <Link to="/market"><Button className="bg-white text-teal-700 hover:bg-teal-50 border-none">Khám phá ngay</Button></Link>
        </div>
      </div>

      {/* Sứ mệnh */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Sứ mệnh của chúng tôi</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Giúp sinh viên tiết kiệm chi phí học tập và sinh hoạt thông qua việc tái sử dụng tài nguyên, đồng thời xây dựng lối sống xanh và cộng đồng tin cậy.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<ShieldCheck size={32}/>} title="An toàn tuyệt đối" desc="Bắt buộc xác thực email .edu.vn để đảm bảo người bán là sinh viên thật." />
            <FeatureCard icon={<Users size={32}/>} title="Cộng đồng văn minh" desc="Hệ thống đánh giá tín nhiệm và báo cáo vi phạm minh bạch." />
            <FeatureCard icon={<HeartHandshake size={32}/>} title="Tiết kiệm chi phí" desc="Mua giáo trình, đồ dùng với giá chỉ bằng 30-50% giá gốc." />
        </div>
      </section>

      {/* Quy trình hoạt động */}
      <section className="bg-white py-16 px-4 border-y border-gray-100">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Quy trình giao dịch</h2>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl font-bold text-teal-600 mb-4 uppercase tracking-wider">Dành cho người bán</h3>
                    <ul className="space-y-4 text-gray-600 font-medium">
                        <li className="flex gap-3"><span className="bg-teal-100 text-teal-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</span> Đăng ký tài khoản & Xác thực sinh viên.</li>
                        <li className="flex gap-3"><span className="bg-teal-100 text-teal-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</span> Chụp ảnh & Đăng tin sản phẩm (Chờ duyệt).</li>
                        <li className="flex gap-3"><span className="bg-teal-100 text-teal-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</span> Chat & Chốt lịch hẹn với người mua.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-orange-500 mb-4 uppercase tracking-wider">Dành cho người mua</h3>
                    <ul className="space-y-4 text-gray-600 font-medium">
                        <li className="flex gap-3"><span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</span> Tìm kiếm sản phẩm theo trường hoặc danh mục.</li>
                        <li className="flex gap-3"><span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</span> Kiểm tra uy tín người bán (Trường, Đánh giá).</li>
                        <li className="flex gap-3"><span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</span> Chat thương lượng & Giao dịch trực tiếp.</li>
                    </ul>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
}

function FeatureCard({icon, title, desc}: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 mx-auto bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">{icon}</div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
        </div>
    )
}