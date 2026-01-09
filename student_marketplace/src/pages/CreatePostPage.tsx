import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { Upload, X, DollarSign, Image as ImageIcon, Sparkles } from "lucide-react";
import { PRODUCTS } from "../mock/data";
import { useProducts } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePostPage() {
   const navigate = useNavigate();
   const { addProduct } = useProducts();
   const { user } = useAuth(); // Lấy user chuẩn từ AuthContext v2
   
   const [images, setImages] = useState<string[]>([]);
   const [title, setTitle] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("");
   const [condition, setCondition] = useState("Mới 100%");
   const [description, setDescription] = useState("");

   const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

   const handlePost = () => {
      if (!user) {
          alert("Vui lòng đăng nhập (hoặc reload trang) để hệ thống nhận diện bạn!");
          return;
      }
      
      if (!title || !price || !category) {
          alert("Vui lòng điền đầy đủ thông tin!");
          return;
      }

      const newProduct = {
          id: `new_${Date.now()}`,
          title: title,
          price: Number(price),
          image: images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
          category: category,
          status: 'pending' as const, // Quan trọng: Status pending
          condition: condition as any,
          description: description,
          seller: user, // Quan trọng: Gán người bán là user hiện tại (ID='me')
          postedAt: "Vừa xong",
          timestamp: Date.now()
      };

      addProduct(newProduct);
      alert("Đăng tin thành công! Sản phẩm đã vào danh sách chờ duyệt.");
      navigate("/market");
   };

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const url = URL.createObjectURL(e.target.files[0]);
         setImages([...images, url]);
      }
   };

   const removeImage = (index: number) => {
      setImages(images.filter((_, i) => i !== index));
   };

   return (
      <div className="min-h-screen bg-[#F8F9FC] pb-20">
         <Header />

         <main className="max-w-4xl mx-auto px-4 mt-8">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm">
                  <Sparkles size={24} />
               </div>
               <div>
                  <h1 className="text-3xl font-black text-gray-900">Đăng bán sản phẩm</h1>
                  <p className="text-gray-500">Chia sẻ món đồ cũ của bạn tới cộng đồng sinh viên.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
               <div className="md:col-span-8 space-y-6">
                  {/* Image Upload */}
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                     <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-teal-500" /> Hình ảnh sản phẩm
                     </h3>

                     <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-teal-600">
                           <Upload size={24} className="mb-2" />
                           <span className="text-xs font-bold">Thêm ảnh</span>
                           <input type="file" hidden onChange={handleImageUpload} />
                        </label>

                        {images.map((img, idx) => (
                           <div key={idx} className="aspect-square rounded-2xl bg-gray-100 relative group overflow-hidden border border-gray-200">
                              <img src={img} className="w-full h-full object-cover" alt="preview" />
                              <button
                                 onClick={() => removeImage(idx)}
                                 className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                              >
                                 <X size={14} />
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Info Inputs */}
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                     <h3 className="font-bold text-lg mb-2">Thông tin chi tiết</h3>

                     <div className="space-y-4">
                        <div>
                             <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Tên sản phẩm</label>
                             <input 
                                type="text" 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full h-12 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 text-sm focus:border-teal-500 focus:outline-none transition-colors"
                                placeholder="Ví dụ: Giáo trình Giải tích 1..."
                             />
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Danh mục</label>
                               <select 
                                  value={category}
                                  onChange={e => setCategory(e.target.value)}
                                  className="w-full h-12 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 text-sm focus:border-teal-500 focus:outline-none transition-colors cursor-pointer capitalize"
                               >
                                  <option value="">Chọn danh mục</option>
                                  {categories.map((cat) => (
                                     <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                  <option value="Khác">Khác</option>
                               </select>
                            </div>
                            <div>
                               <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Tình trạng</label>
                               <select 
                                  value={condition}
                                  onChange={e => setCondition(e.target.value)}
                                  className="w-full h-12 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 text-sm focus:border-teal-500 focus:outline-none transition-colors cursor-pointer"
                               >
                                  <option value="Mới 100%">Mới 100%</option>
                                  <option value="Như mới (99%)">Như mới (99%)</option>
                                  <option value="Cũ (80-90%)">Cũ (80-90%)</option>
                                  <option value="Xác máy">Hư hỏng/Xác máy</option>
                               </select>
                            </div>
                         </div>

                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mô tả chi tiết</label>
                            <textarea
                               rows={5}
                               value={description}
                               onChange={e => setDescription(e.target.value)}
                               placeholder="Mô tả..."
                               className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-sm focus:border-teal-500 focus:outline-none transition-colors resize-none"
                            ></textarea>
                         </div>
                     </div>
                  </div>

                  {/* Price */}
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                     <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <DollarSign size={20} className="text-green-600" /> Giá bán
                     </h3>
                     <div className="mb-6">
                        <input 
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full h-12 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 text-sm focus:border-teal-500 focus:outline-none transition-colors"
                            placeholder="Nhập giá bán (VNĐ)..."
                        />
                     </div>
                  </div>
               </div>

               {/* Sidebar Actions */}
               <div className="md:col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
                     <h3 className="font-bold text-lg mb-4">Đăng tin ngay</h3>
                     <div className="space-y-3">
                        <Button
                           onClick={handlePost}
                           className="w-full rounded-xl h-12 shadow-lg shadow-teal-500/20 text-lg"
                        >
                           Đăng bán ngay
                        </Button>
                        <Button variant="outline" className="w-full rounded-xl h-12 bg-transparent border-gray-200 text-gray-500">
                           Lưu nháp
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}