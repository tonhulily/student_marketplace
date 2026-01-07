import { Link } from "react-router-dom";
import Button from "../components/Button";
import {
  Search,
  Repeat,
  ShieldCheck,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import logoImg from '../assets/logo.png';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-gray-800 pb-20 overflow-x-hidden">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-16 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={logoImg} alt="Green2Hand" className="h-full w-auto object-contain" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Green<span className="text-teal-600">2Hand</span>
          </span>
        </div>

        <div className="hidden md:flex gap-8 font-semibold text-gray-500 text-sm">
          <a href="#" className="hover:text-teal-600 transition-colors">
            Khám phá
          </a>

          <a href="#" className="hover:text-teal-600 transition-colors">
            Cộng đồng
          </a>
        </div>

        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="outline" size="sm" className="rounded-xl">
              Đăng nhập
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="rounded-xl">
              Đăng ký
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-5xl mx-auto text-center mt-12 px-4 relative">
        <div className="absolute top-0 left-10 w-20 h-20 bg-yellow-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl opacity-40"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-teal-100 shadow-sm text-teal-700 font-bold text-xs mb-8">
          <Sparkles size={14} className="text-yellow-500" />
          <span>Nền tảng dành riêng cho sinh viên Việt Nam</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 text-gray-900 tracking-tight">
          Chợ đồ cũ <br />
          <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-green-500 bg-clip-text text-transparent">
            Sắc màu & An toàn
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Không chỉ là mua bán. Chúng tôi mang đến tính năng{" "}
          <strong className="text-gray-800">Chat trực tiếp</strong> và bắt buộc{" "}
          <strong className="text-gray-800">Xác thực sinh viên</strong> để bảo vệ túi tiền của bạn.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/market">
            <Button size="lg" className="shadow-teal-500/30 bg-teal-600 hover:bg-teal-700">
              <Search className="w-5 h-5 mr-2" /> Tìm đồ ngay
            </Button>
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <div className="md:col-span-4 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Xác thực Sinh viên</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Yêu cầu bắt buộc email <span className="font-mono bg-green-100 px-1 rounded text-green-700">.edu.vn</span>.
                Biết rõ người bán học trường nào, uy tín ra sao.
              </p>

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div>
                  <div className="h-2 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full w-fit">
                    <ShieldCheck size={10} /> VERIFIED STUDENT
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* REMOVED EXCHANGE SECTION */}


          <div className="md:col-span-4 bg-[#F0FDF4] p-8 rounded-[2.5rem] border border-green-100 hover:border-green-300 transition-colors group">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-500 mb-6">
              <ShoppingBag size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Lọc giá thông minh</h3>
            <p className="text-gray-500 text-sm mb-6">Chỉ hiển thị những món đồ phù hợp với túi tiền sinh viên.</p>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                <span>0đ</span>
                <span className="text-green-500">500.000đ</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 bg-[#F0F8FF] p-8 rounded-[2.5rem] border border-blue-100 hover:border-blue-300 transition-colors group">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
              <MessageCircle size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Chat trực tiếp</h3>
            <p className="text-gray-500 text-sm mb-6">Đàm phán giá cả, gửi ảnh thực tế và chốt địa điểm giao dịch ngay trên web.</p>

            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center shadow-sm`}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="avatar" className="w-full h-full rounded-full" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                +9
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#FFF8E1] p-8 rounded-[2.5rem] border border-orange-100 hover:border-orange-300 transition-colors flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-orange-900">Trạng thái rõ ràng</h3>
              <p className="text-orange-700/70 text-sm">Không còn cảnh hỏi "Còn hàng không?"</p>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-bold shadow-green-200 shadow-lg">Còn hàng</span>
              <span className="px-3 py-1 bg-gray-300 text-gray-500 rounded-lg text-xs font-bold opacity-50">Đã bán</span>
            </div>
          </div>

        </div>
      </section>

      <section className="mt-24 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-teal-600 via-emerald-600 to-green-500 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-teal-500/40">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white rounded-full blur-[80px] opacity-20 mix-blend-overlay"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-orange-400 rounded-full blur-[60px] opacity-30"></div>

          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight drop-shadow-sm">
              Bắt đầu dọn phòng thôi!
            </h2>
            <p className="text-teal-50 mb-8 max-w-lg mx-auto text-lg font-medium">
              Đăng ký ngay bằng email sinh viên để tham gia cộng đồng mua bán văn minh nhất.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 border-none rounded-2xl px-10 text-lg hover:scale-105 transition-transform shadow-xl">
                Tạo tài khoản ngay <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}