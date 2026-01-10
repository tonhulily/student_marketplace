import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Search, ShieldCheck, MessageCircle, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import logoImg from '../assets/logo.png';
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

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
          <Link to="/market" className="hover:text-teal-600 transition-colors">
            Khám phá
          </Link>
          <Link to="/about" className="hover:text-teal-600 transition-colors">
            Giới thiệu
          </Link>
        </div>

        <div className="flex gap-3">
          {user ? (
            <div className="flex items-center gap-3">
               <span className="font-bold text-gray-700">Chào, {user.name}</span>
               <Link to="/profile/me">
                  <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-teal-500 cursor-pointer"/>
               </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="rounded-xl">Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="rounded-xl">Đăng ký</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 md:pt-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-bold text-sm border border-teal-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles size={16} /> <span>Dành riêng cho sinh viên Việt Nam</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
              Trao đổi đồ cũ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                nhanh & an toàn.
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 font-medium max-w-md leading-relaxed">
              Nền tảng mua bán giáo trình, đồ dùng học tập và nội thất ký túc xá tin cậy nhất. Xác thực sinh viên 100%.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/market">
                <Button size="lg" className="rounded-2xl h-14 px-8 text-lg shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30 transition-all">
                  Dạo chợ ngay <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/create-post">
                 <Button variant="outline" size="lg" className="rounded-2xl h-14 px-8 text-lg border-2 bg-white hover:bg-gray-50">
                    Đăng bán đồ
                 </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100" />
                 ))}
              </div>
              <div className="text-sm font-bold text-gray-500">
                <span className="text-teal-600 font-black">2,000+</span> sinh viên tin dùng
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="relative grid grid-cols-2 gap-4">
               <div className="space-y-4 pt-12">
                  <FeatureCard icon={<ShoppingBag className="text-white"/>} color="bg-orange-500" title="Đồ dùng đa dạng" desc="Từ sách vở đến tủ lạnh" />
                  <FeatureCard icon={<ShieldCheck className="text-white"/>} color="bg-teal-500" title="Xác thực sinh viên" desc="Yên tâm giao dịch" />
               </div>
               <div className="space-y-4">
                  <FeatureCard icon={<MessageCircle className="text-white"/>} color="bg-blue-500" title="Chat trực tiếp" desc="Thương lượng dễ dàng" />
                  <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100">
                     <div className="text-4xl font-black text-gray-900 mb-2">0đ</div>
                     <div className="text-gray-500 font-medium">Phí đăng tin</div>
                  </div>
               </div>
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
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 border-none rounded-2xl h-14 px-8 text-lg font-bold shadow-lg">
                Đăng ký ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({icon, color, title, desc}: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500 font-medium">{desc}</p>
    </div>
  )
}