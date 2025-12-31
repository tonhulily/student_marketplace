import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import { Upload, X, Repeat, DollarSign, Image as ImageIcon, Sparkles } from "lucide-react";

export default function CreatePostPage() {
  const [images, setImages] = useState<string[]>([]);
  const [allowBarter, setAllowBarter] = useState(false);

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
           <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 shadow-sm">
              <Sparkles size={24} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-gray-900">Đăng bán sản phẩm</h1>
              <p className="text-gray-500">Chia sẻ món đồ cũ của bạn tới cộng đồng sinh viên.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">          
           <div className="md:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <ImageIcon size={20} className="text-violet-500" /> Hình ảnh sản phẩm
                 </h3>
                 
                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 hover:border-violet-500 hover:bg-violet-50 transition-all cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-violet-600">
                       <Upload size={24} className="mb-2"/>
                       <span className="text-xs font-bold">Thêm ảnh</span>
                       <input type="file" hidden onChange={handleImageUpload} />
                    </label>

                    {images.map((img, idx) => (
                       <div key={idx} className="aspect-square rounded-2xl bg-gray-100 relative group overflow-hidden border border-gray-200">
                          <img src={img} className="w-full h-full object-cover" alt="preview" />
                          <button 
                             onClick={() => removeImage(idx)}
                             className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                          >
                             <X size={14} />
                          </button>
                       </div>
                    ))}
                 </div>
                 <p className="text-xs text-gray-400 mt-3 font-medium">* Đăng tối đa 5 ảnh. Ảnh thật giúp bán nhanh hơn!</p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                 <h3 className="font-bold text-lg mb-2">Thông tin chi tiết</h3>
                 
                 <Input label="Tên sản phẩm" placeholder="Ví dụ: Giáo trình Giải tích 1..." />
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Danh mục</label>
                       <select className="w-full h-12 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 text-sm focus:border-violet-500 focus:outline-none transition-colors cursor-pointer">
                          <option>Sách/Giáo trình</option>
                          <option>Đồ công nghệ</option>
                          <option>Nội thất/Gia dụng</option>
                          <option>Thời trang</option>
                          <option>Khác</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Tình trạng</label>
                       <select className="w-full h-12 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 text-sm focus:border-violet-500 focus:outline-none transition-colors cursor-pointer">
                          <option>Mới 100%</option>
                          <option>Như mới (99%)</option>
                          <option>Cũ (80-90%)</option>
                          <option>Hư hỏng/Xác máy</option>
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mô tả chi tiết</label>
                    <textarea 
                       rows={5}
                       placeholder="Mô tả chi tiết về sản phẩm, lý do pass, địa chỉ giao dịch..."
                       className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-sm focus:border-violet-500 focus:outline-none transition-colors resize-none"
                    ></textarea>
                 </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-green-600" /> Giá bán & Trao đổi
                 </h3>

                 <div className="mb-6">
                    <Input label="Giá mong muốn (VNĐ)" type="number" placeholder="Nhập giá bán..." />
                 </div>

                 <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${allowBarter ? 'border-violet-500 bg-violet-50' : 'border-gray-100 bg-gray-50'}`}
                      onClick={() => setAllowBarter(!allowBarter)}
                 >
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${allowBarter ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          <Repeat size={20} />
                       </div>
                       <div>
                          <div className="font-bold text-gray-900">Chấp nhận đổi đồ (Barter)</div>
                          <div className="text-xs text-gray-500">Cho phép người khác đề xuất đổi vật phẩm ngang giá</div>
                       </div>
                    </div>

                    <div className={`w-12 h-7 rounded-full p-1 transition-colors ${allowBarter ? 'bg-violet-500' : 'bg-gray-300'}`}>
                       <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${allowBarter ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                 </div>
              </div>

           </div>

           <div className="md:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
                 <h3 className="font-bold text-lg mb-4">Đăng tin ngay</h3>
                 <ul className="text-sm text-gray-500 space-y-3 mb-6">
                    <li className="flex gap-2">
                       <span className="text-green-500">✓</span> Tin sẽ được duyệt trong 5 phút
                    </li>
                    <li className="flex gap-2">
                       <span className="text-green-500">✓</span> Hiển thị với 10,000+ sinh viên
                    </li>
                    <li className="flex gap-2">
                       <span className="text-green-500">✓</span> Miễn phí 5 tin đăng mỗi tháng
                    </li>
                 </ul>
                 
                 <div className="space-y-3">
                    <Button className="w-full rounded-xl h-12 shadow-lg shadow-violet-500/20 text-lg">
                       Đăng bán ngay
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl h-12 bg-transparent border-gray-200 text-gray-500">
                       Lưu nháp
                    </Button>
                 </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                 <h4 className="font-bold text-blue-800 mb-2">Lưu ý an toàn</h4>
                 <p className="text-xs text-blue-600/80 leading-relaxed">
                    Không chuyển khoản trước khi nhận hàng. Nên giao dịch trực tiếp tại trường học hoặc nơi đông người.
                 </p>
              </div>

           </div>
        </div>
      </main>
    </div>
  );
}