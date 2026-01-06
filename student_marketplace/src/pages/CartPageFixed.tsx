import React from 'react';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { Trash2, ArrowRight, ShoppingBag, Truck, Minus, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
    const { cartItems, removeFromCart, totalPrice, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        if (window.confirm('Xác nhận đặt hàng? Đơn hàng sẽ được gửi đến Green2Xpress.')) {
            clearCart();
            window.alert('Đặt hàng thành công! Cảm ơn bạn đã sử dụng Green2Hand.');
            navigate('/market');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] pb-20">
            <Header />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-teal-600" />
                    Giỏ hàng của bạn
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-50 rounded-full mb-6">
                            <ShoppingBag size={40} className="text-teal-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
                        <p className="text-gray-500 mb-8">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                        <Link to="/market">
                            <Button className="rounded-xl px-8 h-12 shadow-lg shadow-teal-500/20">
                                Dạo chợ ngay
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* List Items */}
                        <div className="md:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-800 line-clamp-2 mb-1">{item.title}</h3>
                                        <p className="text-teal-600 font-bold mb-2">{item.price.toLocaleString('vi-VN')}đ</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-2 text-sm font-bold min-w-[30px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={20} />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="font-bold text-gray-800 text-lg mb-6">Tổng đơn hàng</h3>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">Tạm tính</span>
                                    <span className="font-bold text-gray-900">{totalPrice.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-gray-600">Phí vận chuyển</span>
                                    <span className="text-green-600 font-bold">Miễn phí</span>
                                </div>
                                <div className="mb-6">
                                    <label className="text-sm font-bold text-gray-700 block mb-2">Đơn vị vận chuyển</label>
                                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200 cursor-pointer">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <Truck size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">Green2Xpress</div>
                                            <div className="text-xs text-green-600">Nhanh & Tiết kiệm</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-6 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
                                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                                            {totalPrice.toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 rounded-xl text-lg shadow-xl shadow-teal-500/20 mb-3 bg-teal-600 hover:bg-teal-700 border-none text-white"
                                    onClick={handlePlaceOrder}
                                >
                                    Đặt hàng ngay <ArrowRight size={20} className="ml-2" />
                                </Button>
                                <Link to="/market">
                                    <Button variant="ghost" className="w-full h-12 rounded-xl text-gray-500">
                                        Tiếp tục mua sắm
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
