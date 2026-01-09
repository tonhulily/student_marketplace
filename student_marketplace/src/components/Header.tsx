import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { Search, Bell, MessageCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import logoImg from '../assets/logo.png';

export default function Header() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  
  // State cho thông báo
  const [showNoti, setShowNoti] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F9FC]/80 backdrop-blur-xl border-b border-gray-200/50 supports-[backdrop-filter]:bg-[#F8F9FC]/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="h-16 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img src={logoImg} alt="Green2Hand" className="h-full w-auto object-contain" />
          </div>
        </Link>

        {/* SEARCH BAR (Giữ nguyên) */}
        <div className="hidden md:flex flex-1 max-w-lg bg-white rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all shadow-sm">
           <div className="pl-4 flex items-center pointer-events-none text-gray-400"><Search size={20} /></div>
           <input type="text" placeholder="Tìm giáo trình, đồ dùng..." className="w-full bg-transparent border-none py-3 px-3 text-sm focus:ring-0 text-gray-800 placeholder:text-gray-400" />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 md:gap-4">
          {!user ? (
              !isAuthPage && (
                <>
                    <Link to="/login"><Button variant="outline" className="rounded-xl">Đăng nhập</Button></Link>
                    <Link to="/register"><Button className="rounded-xl">Đăng ký</Button></Link>
                </>
              )
          ) : (
             <>
                <Link to="/create-post">
                    <Button className="hidden md:flex rounded-xl bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/30 gap-2">
                        <PlusCircle size={18} /> Đăng tin
                    </Button>
                </Link>

                <Link to="/market" className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full"><Search size={24} /></Link>
                
                {/* ICON THÔNG BÁO */}
                <div className="relative">
                    <button 
                        onClick={() => setShowNoti(!showNoti)}
                        className="p-2 text-gray-500 hover:bg-white hover:text-teal-600 rounded-full transition-all relative"
                    >
                        <Bell size={24} />
                    </button>
                    {showNoti && (
                        <div className="absolute top-12 right-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 p-4 text-center text-sm text-gray-500 z-50 animate-in fade-in zoom-in duration-200">
                            <span className="block font-bold text-gray-800 mb-1">Thông báo</span>
                            Hiện chưa có thông báo mới.
                        </div>
                    )}
                </div>

                <Link to="/chat" className="p-2 text-gray-500 hover:bg-white hover:text-teal-600 rounded-full transition-all relative">
                    <MessageCircle size={24} />
                </Link>

                <Link to="/cart" className="p-2 text-gray-500 hover:bg-white hover:text-teal-600 rounded-full transition-all relative">
                    <ShoppingCart size={24} />
                    {cartItems.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F8F9FC]">{cartItems.length}</span>}
                </Link>

                {/* USER PROFILE & LOGOUT */}
                <div className="flex items-center gap-2 group relative">
                    {/* Link tới Profile */}
                    <Link to="/profile/me" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 p-[2px] shadow-md">
                            <img src={user.avatar} className="w-full h-full rounded-full bg-white border-2 border-white object-cover" alt={user.name} />
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-xs font-bold text-gray-900">{user.name}</p>
                            <p className="text-[10px] text-teal-600 font-bold">Verified</p>
                        </div>
                    </Link>

                    {/* Dropdown Logout (Tách riêng để không dính Link) */}
                    <div className="absolute top-8 right-0 w-32 pt-4 hidden group-hover:block z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-bold">
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
             </>
          )}
        </div>
      </div>
    </header>
  );
}