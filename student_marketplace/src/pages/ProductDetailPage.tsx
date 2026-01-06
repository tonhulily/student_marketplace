
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { PRODUCTS } from '../mock/data';
import { ArrowLeft, MapPin, ShieldCheck, MessageCircle, Heart, Share2, School, ShoppingCart, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import VerifiedBadge from '../components/VerifiedBadge';

export default function ProductDetailPage() {
   const { id } = useParams();
   const { addToCart } = useCart();
   const product = PRODUCTS.find(p => p.id === id);

   if (!product) return <div className="text-center py-20">Không tìm thấy sản phẩm</div>;

   const isSold = product.status === 'sold';

   return (
      <div className="min-h-screen bg-[#F8F9FC] pb-20 pt-6">
         <Header />
         <div className="max-w-6xl mx-auto px-4">

            {/* Breadcrumb / Back */}
            <Link to="/market" className="inline-flex items-center text-gray-500 hover:text-teal-600 font-bold mb-6 transition-colors">
               <ArrowLeft size={20} className="mr-2" /> Quay lại chợ
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

               {/* LEFT: IMAGES */}
               <div className="space-y-4">
                  <div className="aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
                     <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  {/* Gallery Mockup */}
                  <div className="grid grid-cols-4 gap-4">
                     {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square rounded-2xl bg-white border border-gray-200 overflow-hidden cursor-pointer hover:border-teal-500 transition-colors">
                           <img src={product.image} className="w-full h-full object-cover opacity-70 hover:opacity-100" />
                        </div>
                     ))}
                  </div>
               </div>

               {/* RIGHT: INFO */}
               <div>
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">

                     <div className="flex justify-between items-start mb-4">
                        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-xl text-sm font-bold">
                           {product.category}
                        </span>
                        <div className="flex gap-2">
                           {isSold && (
                              <span className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-xl text-sm font-bold">
                                 <AlertCircle size={16} /> Đã bán
                              </span>
                           )}
                           <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50 hover:text-pink-500">
                              <Heart size={20} />
                           </Button>
                           <Button variant="ghost" size="icon" className="rounded-full">
                              <Share2 size={20} />
                           </Button>
                        </div>
                     </div>

                     <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-tight">
                        {product.title}
                     </h1>

                     <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-6">
                        {product.price.toLocaleString('vi-VN')}đ
                     </div>

                     {/* Condition Box */}
                     <div className="flex gap-4 mb-8">
                        <div className="bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                           <span className="block text-xs text-gray-400 font-bold uppercase">Tình trạng</span>
                           <span className="font-bold text-gray-800">{product.condition}</span>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                           <span className="block text-xs text-gray-400 font-bold uppercase">Đăng bởi</span>
                           <span className="font-bold text-gray-800">{product.postedAt}</span>
                        </div>
                     </div>

                     <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                        {product.description}
                     </p>

                     {/* Actions */}
                     <div className="flex flex-col gap-3">
                        {!isSold ? (
                           <div className="grid grid-cols-2 gap-3">
                              <Button
                                 onClick={() => addToCart(product)}
                                 className="w-full rounded-2xl h-14 text-lg shadow-xl shadow-teal-500/20 bg-white text-teal-600 border border-teal-100 hover:bg-teal-50"
                              >
                                 <ShoppingCart className="mr-2" /> Thêm giỏ hàng
                              </Button>
                              <Link to={`/chat/${product.seller.id}`} className="w-full">
                                 <Button className="w-full rounded-2xl h-14 text-lg shadow-xl shadow-teal-500/20">
                                    <MessageCircle className="mr-2" /> Chat ngay
                                 </Button>
                              </Link>
                           </div>
                        ) : (
                           <Button disabled className="w-full rounded-2xl h-14 text-lg bg-gray-200 text-gray-500 cursor-not-allowed">
                              Sản phẩm này đã được bán
                           </Button>
                        )}


                     </div>
                  </div>

                  {/* SELLER INFO CARD */}
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mt-6 flex items-center gap-4">
                     <div className="relative">
                        <img src={product.seller.avatar} alt="Seller" className="w-16 h-16 rounded-full border-2 border-white shadow-md" />
                        <div className="absolute -bottom-1 -right-1 bg-white text-green-500 p-1 rounded-full shadow-sm">
                           <VerifiedBadge schoolName={product.seller.school} />
                        </div>
                     </div>
                     <div>
                        <h3 className="font-bold text-lg text-gray-900">{product.seller.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                           <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                              Sinh viên
                           </span>
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                           {[1, 2, 3, 4, 5].map(star => (
                              <span key={star} className="text-yellow-400 text-xs">★</span>
                           ))}
                           <span className="text-xs text-gray-400 ml-1">({product.seller.rating})</span>
                        </div>
                     </div>
                     <Button variant="ghost" className="ml-auto text-violet-600 font-bold">
                        Xem trang
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}