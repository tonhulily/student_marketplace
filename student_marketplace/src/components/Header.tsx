import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { Search, Bell, MessageCircle, PlusCircle, ShoppingCart } from "lucide-react"; // Thêm icon PlusCircle
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { cartItems } = useCart();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F9FC]/80 backdrop-blur-xl border-b border-gray-200/50 supports-[backdrop-filter]:bg-[#F8F9FC]/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

        {/* === LOGO SECTION === */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="bg-gradient-to-br from-violet-600 to-pink-500 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
            S
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 hidden sm:block">
            Student<span className="text-violet-600">Market</span>
          </span>
        </Link>

        {/* === SEARCH BAR === */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
          <input
            type="text"
            placeholder="Tìm kiếm giáo trình, đồ điện tử..."
            className="w-full h-11 pl-11 pr-4 rounded-2xl bg-white border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none text-sm font-medium shadow-sm"
          />
          <Search
            className="absolute left-4 top-3 text-gray-400 group-focus-within:text-violet-600 transition-colors"
            size={20}
          />
        </div>

        {/* === ACTIONS === */}
        {isAuthPage ? (
          <div className="flex gap-3">
            <Link to="/login"><Button variant="ghost">Đăng nhập</Button></Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-4">

            {/* === NÚT ĐĂNG TIN MỚI (NỔI BẬT) === */}
            <Link to="/create-post">
              <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hidden sm:flex gap-2 px-5">
                <PlusCircle size={18} /> Đăng tin
              </Button>
            </Link>

            {/* Nút Dạo chợ (Chỉ hiện icon trên mobile nếu cần, hoặc ẩn) */}
            <Link to="/market" className="hidden lg:block">
              <Button variant="ghost" className="font-bold text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-xl">
                Dạo chợ
              </Button>
            </Link>

            <div className="h-6 w-[1px] bg-gray-300 hidden sm:block"></div>

            {/* Chat */}
            <Link to="/chat">
              <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-white hover:shadow-md hover:text-violet-600 text-gray-500 transition-all w-10 h-10">
                <MessageCircle size={22} strokeWidth={2.5} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-[#F8F9FC]"></span>
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white hover:shadow-md hover:text-violet-600 text-gray-500 transition-all w-10 h-10">
                <ShoppingCart size={22} strokeWidth={2.5} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F8F9FC]">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Noti */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white hover:shadow-md hover:text-violet-600 text-gray-500 transition-all w-10 h-10">
              <Bell size={22} strokeWidth={2.5} />
            </Button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-md ml-1">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                className="w-full h-full rounded-full bg-white border-2 border-white object-cover"
                alt="User"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}