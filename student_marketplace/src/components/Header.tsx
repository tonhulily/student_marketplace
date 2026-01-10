import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, MessageCircle, LogOut, X, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Button from './Button';
import logo from '../assets/logo.png'; // FIX: Import logo chính xác

export default function Header() {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    // Lấy từ khóa từ URL để khởi tạo state
    const [keyword, setKeyword] = useState(searchParams.get('search') || '');
    
    // State cho tìm kiếm mobile
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    // Đồng bộ ô input khi URL thay đổi (ví dụ user bấm back)
    useEffect(() => {
        setKeyword(searchParams.get('search') || '');
    }, [searchParams]);

    // Ẩn thanh tìm kiếm nếu đang ở trang Đăng tin
    const isCreatePostPage = location.pathname === '/create-post' || location.pathname === '/post';

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        if ((e as React.KeyboardEvent).key === 'Enter' || e.type === 'click') {
            if (keyword.trim()) {
                navigate(`/market?search=${encodeURIComponent(keyword)}`);
                setShowMobileSearch(false); // Đóng mobile search sau khi tìm
            } else {
                navigate('/market');
            }
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
                {/* LOGO & BRAND NAME FIX */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <img src={logo} alt="Green2Hand Logo" className="w-10 h-10 object-contain" />
                    <span className="font-black text-xl tracking-tight text-gray-900 hidden sm:block">
                        Green<span className="text-teal-600">2Hand</span>
                    </span>
                </Link>

                {/* SEARCH BAR - DESKTOP */}
                {!isCreatePostPage && (
                    <div className="flex-1 max-w-xl relative hidden md:block group">
                        <input 
                            type="text" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Tìm kiếm giáo trình, đồ dùng..." 
                            className="w-full h-12 bg-gray-100/50 border-transparent rounded-2xl pl-12 pr-4 focus:ring-2 focus:ring-teal-500/20 focus:bg-white focus:border-teal-500 transition-all font-medium text-gray-800"
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
                    </div>
                )}

                {/* ACTIONS */}
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    {/* Search Icon Mobile Toggle */}
                    {!isCreatePostPage && (
                        <button 
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                            className="md:hidden w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
                        >
                            {showMobileSearch ? <X size={20} /> : <Search size={20} />}
                        </button>
                    )}

                    {user ? (
                        <>
                            {/* Nút Đăng Bán (Desktop) */}
                            <Link to="/create-post" className="hidden md:flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/20 active:scale-95 mr-2">
                                <PlusCircle size={18} />
                                <span>Đăng bán</span>
                            </Link>

                            {/* Nút Đăng Bán (Mobile) */}
                            <Link to="/create-post" className="md:hidden w-10 h-10 rounded-full bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center hover:bg-teal-100 transition-colors">
                                <PlusCircle size={20} />
                            </Link>

                            <Link to="/cart" className="relative w-10 h-10 rounded-full bg-gray-50 hover:bg-teal-50 flex items-center justify-center transition-colors group">
                                <ShoppingCart size={20} className="text-gray-600 group-hover:text-teal-600" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>

                            <Link to="/chat" className="w-10 h-10 rounded-full bg-gray-50 hover:bg-teal-50 flex items-center justify-center transition-colors group">
                                <MessageCircle size={20} className="text-gray-600 group-hover:text-teal-600" />
                            </Link>
                            
                            <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

                            {/* PROFILE */}
                            <Link to="/profile/me" className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                                <span className="font-bold text-sm text-gray-700 hidden lg:block max-w-[100px] truncate">
                                    {user.name}
                                </span>
                            </Link>
                            
                            <button 
                                onClick={logout}
                                className="w-10 h-10 rounded-full bg-gray-50 hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                                title="Đăng xuất"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login">
                                <Button variant="ghost" className="text-gray-600 font-bold hover:bg-gray-100">Đăng nhập</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/30 rounded-xl">Đăng ký</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE SEARCH BAR */}
            {showMobileSearch && !isCreatePostPage && (
                <div className="md:hidden px-4 pb-4 border-b border-gray-100 animate-in slide-in-from-top-2">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleSearch}
                            autoFocus
                            placeholder="Tìm kiếm..." 
                            className="w-full h-12 bg-gray-100 border-none rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-teal-500/20 font-medium"
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    </div>
                </div>
            )}
        </header>
    );
}