import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Import Header
import { Filter, ShieldCheck } from 'lucide-react';
import { PRODUCTS, Product, CURRENT_USER } from '../mock/data'; // Import CURRENT_USER

import VerifiedBadge from '../components/VerifiedBadge';

export default function MarketPage() {
   const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 5000000 });
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [sortOption, setSortOption] = useState<string>('newest');

   // Extract unique categories from data for the filter
   const categories = ['Tất cả', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

   const handleCategoryChange = (category: string) => {
      setSelectedCategories(prev => {
         if (category === 'Tất cả') {
            return prev.includes('Tất cả') ? [] : ['Tất cả']; // Toggle All
         }
         // If "All" was selected, deselect it when clicking specific
         const newPrev = prev.filter(c => c !== 'Tất cả');

         if (newPrev.includes(category)) {
            return newPrev.filter(c => c !== category);
         } else {
            return [...newPrev, category];
         }
      });
   };

   const filteredProducts = PRODUCTS.filter(p => {
      const matchPrice = p.price >= priceRange.min && p.price <= priceRange.max;

      const isAllSelected = selectedCategories.includes('Tất cả') || selectedCategories.length === 0;
      const matchCategory = isAllSelected || selectedCategories.includes(p.category);

      return matchPrice && matchCategory;
   });

   // Sorting Logic
   const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === 'newest') {
         return b.timestamp - a.timestamp;
      } else if (sortOption === 'price_asc') {
         return a.price - b.price;
      } else if (sortOption === 'nearest') {
         // Prioritize sellers from the current user's school (or specifically Bách Khoa as requested)
         const isNearA = a.seller.school.includes('Bách Khoa') || a.seller.school === CURRENT_USER.school;
         const isNearB = b.seller.school.includes('Bách Khoa') || b.seller.school === CURRENT_USER.school;

         if (isNearA && !isNearB) return -1;
         if (!isNearA && isNearB) return 1;
         return 0;
      }
      return 0;
   });

   return (
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
         {/* 1. SỬ DỤNG HEADER CHUNG */}
         <Header />

         {/* BODY CONTENT */}
         <div className="flex-1 max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 w-full pb-20">

            {/* SIDEBAR FILTER */}
            <aside className="md:col-span-3 space-y-6">
               <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
                  <div className="flex items-center gap-2 mb-6 text-teal-700 font-bold">
                     <Filter size={20} /> Bộ lọc tìm kiếm
                  </div>

                  {/* Price Filter */}
                  <div className="mb-8">
                     <label className="block text-sm font-bold text-gray-700 mb-4">Khoảng giá</label>
                     <div className="space-y-4">
                        <div>
                           <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Tối thiểu</span>
                              <span className="font-bold text-teal-600">{priceRange.min.toLocaleString('vi-VN')}đ</span>
                           </div>
                           <input
                              type="range"
                              min="0"
                              max="5000000"
                              step="50000"
                              value={priceRange.min}
                              onChange={(e) => {
                                 const val = Number(e.target.value);
                                 if (val <= priceRange.max) setPriceRange({ ...priceRange, min: val });
                              }}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                           />
                        </div>
                        <div>
                           <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Tối đa</span>
                              <span className="font-bold text-teal-600">{priceRange.max.toLocaleString('vi-VN')}đ</span>
                           </div>
                           <input
                              type="range"
                              min="0"
                              max="5000000"
                              step="50000"
                              value={priceRange.max}
                              onChange={(e) => {
                                 const val = Number(e.target.value);
                                 if (val >= priceRange.min) setPriceRange({ ...priceRange, max: val });
                              }}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Categories */}
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-3">Danh mục</label>
                     <div className="space-y-2">
                        <div className="space-y-2">
                           {categories.map(cat => (
                              <label key={cat} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                                 <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                    className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-gray-300"
                                 />
                                 <span className="text-gray-600 font-medium">{cat}</span>
                              </label>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </aside>

            {/* PRODUCT GRID */}
            <main className="md:col-span-9">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Dành cho bạn</h2>
                  <select
                     value={sortOption}
                     onChange={(e) => setSortOption(e.target.value)}
                     className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-600 shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-teal-200"
                  >
                     <option value="newest">Mới nhất</option>
                     <option value="price_asc">Giá thấp đến cao</option>
                     <option value="nearest">Gần tôi nhất</option>
                  </select>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                     <ProductCard key={product.id} product={product} />
                  ))}
               </div>
            </main>
         </div>
      </div>
   );
}

// Sub-component: Product Card (Giữ nguyên logic cũ)
function ProductCard({ product }: { product: Product }) {
   const isSold = product.status === 'sold';
   return (
      <Link to={`/product/${product.id}`} className="block group h-full">
         <div className={`bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative h-full flex flex-col ${isSold ? 'opacity-70 grayscale' : ''}`}>
            <div className="absolute top-4 left-4 z-10">
               {isSold ? (
                  <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Đã bán</span>
               ) : (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-green-500/30">Còn hàng</span>
               )}
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
               <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex flex-col flex-1">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md mb-2 inline-block">{product.category}</span>
                  <span className="text-xs text-gray-400 font-medium">{product.postedAt}</span>
               </div>
               <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 min-h-[3.5rem] leading-tight">{product.title}</h3>
               <div className="text-xl font-black text-teal-600 mb-4">{product.price.toLocaleString('vi-VN')}đ</div>
               <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-50">
                  <img src={product.seller.avatar} alt="seller" className="w-8 h-8 rounded-full border border-gray-200" />
                  <div className="flex-1 min-w-0">
                     <p className="text-xs font-bold text-gray-700 truncate">{product.seller.name}</p>
                     <div className="flex items-center gap-1 mt-0.5">
                        <VerifiedBadge schoolName={product.seller.school} />
                        <span className="text-[10px] text-gray-400">Đã xác thực</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
}