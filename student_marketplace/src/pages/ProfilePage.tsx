import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";
import { Star, MapPin, Mail, ShieldAlert } from "lucide-react";
import { MOCK_USERS } from "../mock/data";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const { getProductsByUser } = useProducts();

  const isMyProfile =
    userId === 'abc@sis.hust.edu.vn' ||
    (!userId && currentUser) ||
    (currentUser && currentUser.id === userId);

  const displayUser = isMyProfile
    ? currentUser
    : MOCK_USERS.find(u => u.id === userId);

  const [activeTab, setActiveTab] = useState<'selling' | 'sold' | 'pending'>('selling');

  if (!displayUser) {
    return <div className="text-center mt-20">Không tìm thấy người dùng.</div>;
  }

  const userProducts = getProductsByUser(displayUser.id);
  const sellingProducts = userProducts.filter(p => p.status === 'available');
  const soldProducts = userProducts.filter(p => p.status === 'sold');
  const pendingProducts = userProducts.filter(p => p.status === 'pending');

  const displayList =
    activeTab === 'selling'
      ? sellingProducts
      : activeTab === 'sold'
      ? soldProducts
      : pendingProducts;

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Header />

      <div className="max-w-4xl mx-auto p-4 mt-8">
        {/* USER INFO */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={displayUser.avatar}
            className="w-32 h-32 rounded-full border"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-black">{displayUser.name}</h1>

            <div className="flex gap-4 text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {displayUser.school}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={16} /> {displayUser.id}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4 text-yellow-400">
              {[1,2,3,4,5].map(star => (
                <Star
                  key={star}
                  size={20}
                  fill={star <= displayUser.rating ? "currentColor" : "none"}
                />
              ))}
              <span className="text-gray-700 font-bold">
                ({displayUser.rating}/5)
              </span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab('selling')}
            className={activeTab === 'selling' ? 'font-bold text-green-600 border-b-2 border-green-600' : 'text-gray-400'}
          >
            Đang bán
          </button>

          <button
            onClick={() => setActiveTab('sold')}
            className={activeTab === 'sold' ? 'font-bold text-green-600 border-b-2 border-green-600' : 'text-gray-400'}
          >
            Đã bán
          </button>

          {isMyProfile && (
            <button
              onClick={() => setActiveTab('pending')}
              className={activeTab === 'pending' ? 'font-bold text-orange-500 border-b-2 border-orange-500 flex items-center gap-1' : 'text-gray-400 flex items-center gap-1'}
            >
              <ShieldAlert size={16} />
              Chờ duyệt ({pendingProducts.length})
            </button>
          )}
        </div>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayList.length === 0 && (
            <p className="col-span-2 text-center text-gray-500 py-10">
              Chưa có sản phẩm nào.
            </p>
          )}

          {displayList.map(p => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl border flex gap-4"
            >
              <img
                src={p.image}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-green-600 font-bold">
                  {p.price.toLocaleString()}đ
                </p>
                {p.status === 'pending' && (
                  <span className="text-xs text-orange-600 font-bold">
                    Đang chờ duyệt
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
