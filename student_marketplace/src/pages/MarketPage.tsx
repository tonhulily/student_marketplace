import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Filter } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext'; // Dùng Context thay vì import trực tiếp
import VerifiedBadge from '../components/VerifiedBadge';
import { Product } from '../mock/data';

export default function MarketPage() {
   const { products } = useProducts(); // Lấy products từ Context
   const [priceRange] = useState<{ min: number, max: number }>({ min: 0, max: 10000000 });
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   
   // Lọc bỏ sản phẩm Pending ngay từ đầu
   const availableProducts = products.filter(p => p.status !== 'pending');

   const categories = Array.from(new Set(availableProducts.map(p => p.category)));

   const handleCategoryChange = (category: string) => {
      setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
   };

   const filteredProducts = availableProducts.filter(p => {
      const matchPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      return matchPrice && matchCategory;
   });

   return (
      <div className="min-h-screen bg-[#F8F9FC] pb-20">
         <Header />
         
         <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Filter & Sort Bar (Giữ nguyên logic giao diện) */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button 
                        onClick={() => setSelectedCategories([])}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategories.length === 0 ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
                    >
                        Tất cả
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategories.includes(cat) ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 font-bold text-sm text-gray-700 hover:bg-gray-50">
                        <Filter size={16}/> Bộ lọc
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        Không tìm thấy sản phẩm phù hợp.
                    </div>
                )}
            </div>
         </div>
      </div>
   );
}

// ProductCard Component
function ProductCard({ product }: { product: Product }) {
   const isSold = product.status === 'sold';
   
   return (
      <div className={`bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative h-full flex flex-col group ${isSold ? 'opacity-70 grayscale' : ''}`}>
         <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
            <div className="absolute top-4 left-4 z-10">
               {isSold ? (
                  <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Đã bán</span>
               ) : (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-green-500/30">Còn hàng</span>
               )}
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden bg-white relative flex items-center justify-center p-2">
               <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="px-5 pt-5 pb-2">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md mb-2 inline-block">{product.category}</span>
                  <span className="text-xs text-gray-400 font-medium">{product.postedAt}</span>
               </div>
               <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 min-h-[3.5rem] leading-tight">{product.title}</h3>
               <div className="text-xl font-black text-teal-600 mb-2">{product.price.toLocaleString('vi-VN')}đ</div>
            </div>
         </Link>

         <div className="px-5 pb-5 mt-auto">
             <Link to={`/profile/${product.seller.id}`} className="flex items-center gap-3 pt-4 border-t border-gray-50 hover:bg-gray-50 transition-colors p-2 -mx-2 rounded-xl">
                <img src={product.seller.avatar} alt="seller" className="w-8 h-8 rounded-full border border-gray-200" />
                <div className="flex-1 min-w-0">
                   <p className="text-xs font-bold text-gray-700 truncate hover:text-teal-600 transition-colors">{product.seller.name}</p>
                   <div className="flex items-center gap-1 mt-0.5">
                      <VerifiedBadge schoolName={product.seller.school} />
                      <span className="text-[10px] text-gray-400">Đã xác thực</span>
                   </div>
                </div>
             </Link>
         </div>
      </div>
   );
}