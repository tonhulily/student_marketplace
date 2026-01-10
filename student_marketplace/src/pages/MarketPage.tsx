import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { Search, ShoppingCart, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';

// --- COMPONENT: DUAL RANGE SLIDER ---
interface DualRangeSliderProps {
    min: number;
    max: number;
    onChange: (values: [number, number]) => void;
    initialValues: [number, number];
}

const DualRangeSlider = ({ min, max, onChange, initialValues }: DualRangeSliderProps) => {
    const [minVal, setMinVal] = useState(initialValues[0]);
    const [maxVal, setMaxVal] = useState(initialValues[1]);
    const minValRef = useRef(initialValues[0]);
    const maxValRef = useRef(initialValues[1]);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

    useEffect(() => {
        if (maxValRef.current && range.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxValRef.current);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, min, max]);

    useEffect(() => {
        if (minValRef.current && range.current) {
            const minPercent = getPercent(minValRef.current);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, min, max]);

    useEffect(() => {
        onChange([minVal, maxVal]);
    }, [minVal, maxVal]);

    // FIX: Đổi màu núm kéo (Thumb) thành màu Teal, viền Trắng cho dễ nhìn
    const thumbStyles = "pointer-events-none absolute h-0 w-full outline-none z-[3] appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-teal-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white";

    return (
        <div className="relative w-full h-12 flex items-center justify-center">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className={`${thumbStyles} z-[3]`}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className={`${thumbStyles} z-[4]`}
            />

            <div className="relative w-full">
                <div className="absolute w-full h-1.5 bg-gray-200 rounded-full z-[1]" />
                <div ref={range} className="absolute h-1.5 bg-teal-600 rounded-full z-[2]" />
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
export default function MarketPage() {
    const { products } = useProducts();
    const { addToCart } = useCart();
    
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // FIX: State mới để lọc sản phẩm còn hàng
    const [showAvailableOnly, setShowAvailableOnly] = useState(true);

    const globalMaxPrice = useMemo(() => Math.max(...products.map(p => p.price), 1000000), [products]);
    const globalMinPrice = 0;

    const [priceRange, setPriceRange] = useState<[number, number]>([globalMinPrice, globalMaxPrice]);

    const categories = useMemo(() => 
        Array.from(new Set(products.map(p => p.category))), 
    [products]);

    // Filtering Logic
    const filteredProducts = products.filter(product => {
        // FIX: Logic lọc theo trạng thái "Còn hàng"
        // Nếu showAvailableOnly = true -> Chỉ lấy status 'available'
        // Nếu showAvailableOnly = false -> Lấy cả 'available' và 'sold' (loại bỏ 'pending' vì chưa duyệt)
        if (product.status === 'pending') return false; 
        if (showAvailableOnly && product.status !== 'available') return false;

        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const formatPrice = (price: number) => {
        if (price >= 1000000) return (price / 1000000).toFixed(1) + 'tr';
        if (price >= 1000) return (price / 1000).toFixed(0) + 'k';
        return price;
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] pb-20">
            <Header />

            <main className="max-w-6xl mx-auto px-4 mt-8">
                
                {/* TOP BAR */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between relative z-30">
                    
                    {/* Search Bar */}
                    <div className="relative flex-1 w-full md:max-w-xl">
                        <input
                            type="text"
                            placeholder="Tìm kiếm giáo trình, đồ dùng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-teal-500/20 text-gray-800 placeholder-gray-400 font-medium"
                        />
                        <Search className="absolute left-4 top-4 text-gray-400" size={24} />
                    </div>

                    {/* Filter Toggle Button */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`h-14 px-6 rounded-2xl flex items-center gap-2 font-bold shadow-sm transition-all border
                                ${isFilterOpen 
                                    ? 'bg-teal-600 text-white border-teal-600' 
                                    : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
                                }`}
                        >
                            <SlidersHorizontal size={20} />
                            <span className="hidden sm:inline">Bộ lọc</span>
                            {/* Dot indicator */}
                            {(category !== 'all' || priceRange[0] > globalMinPrice || priceRange[1] < globalMaxPrice || !showAvailableOnly) && (
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#F8F9FC]"></span>
                            )}
                        </button>

                        {/* FILTER DROPDOWN PANEL */}
                        {isFilterOpen && (
                            <div className="absolute right-0 top-16 w-[340px] bg-white rounded-3xl shadow-xl border border-gray-100 p-6 z-40 animate-in fade-in slide-in-from-top-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-gray-900">Bộ lọc tìm kiếm</h3>
                                    <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* FIX: Checkbox "Còn hàng" */}
                                <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <span className="text-sm font-bold text-gray-700">Còn hàng</span>
                                        <div className="relative">
                                            <input 
                                                type="checkbox" 
                                                checked={showAvailableOnly} 
                                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                                                className="hidden" 
                                            />
                                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${showAvailableOnly ? 'bg-teal-600 border-teal-600' : 'border-gray-300 bg-white'}`}>
                                                {showAvailableOnly && <Check size={14} className="text-white" />}
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {/* Categories Filter */}
                                <div className="mb-6">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Danh mục</label>
                                    <div className="relative">
                                        <select 
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full p-3 bg-gray-50 rounded-xl border-none font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 cursor-pointer appearance-none"
                                        >
                                            <option value="all">Tất cả danh mục</option>
                                            {categories.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Price Range Slider */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Khoảng giá</label>
                                        <span className="text-sm font-bold text-teal-600">
                                            {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                                        </span>
                                    </div>
                                    <div className="px-2">
                                        <DualRangeSlider 
                                            min={0} 
                                            max={globalMaxPrice} 
                                            initialValues={priceRange}
                                            onChange={setPriceRange}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                        <span>0đ</span>
                                        <span>{formatPrice(globalMaxPrice)}</span>
                                    </div>
                                </div>

                                {/* Reset Action */}
                                <Button 
                                    onClick={() => {
                                        setCategory('all');
                                        setPriceRange([0, globalMaxPrice]);
                                        setShowAvailableOnly(true); // Reset về mặc định
                                    }}
                                    variant="outline"
                                    className="w-full rounded-xl border-gray-200 text-gray-500 hover:bg-gray-50"
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* PRODUCT LIST */}
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    Kết quả tìm kiếm 
                    <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-lg">
                        {filteredProducts.length}
                    </span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className={`bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow group ${product.status === 'sold' ? 'opacity-70' : ''}`}>
                            <Link to={`/product/${product.id}`} className="block relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className={`w-full h-full object-cover transition-transform duration-300 ${product.status !== 'sold' ? 'group-hover:scale-105' : 'grayscale'}`}
                                />
                                {product.status === 'sold' && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">Đã bán</span>
                                    </div>
                                )}
                                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm">
                                    {product.condition}
                                </div>
                            </Link>

                            <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg truncate max-w-[70%]">
                                        {product.category}
                                    </span>
                                </div>
                                
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-teal-600 transition-colors">
                                        {product.title}
                                    </h3>
                                </Link>

                                <div className="flex items-center justify-between pt-2">
                                    <span className="font-black text-lg text-gray-900">
                                        {product.price.toLocaleString()}đ
                                    </span>
                                    {/* Chỉ hiện nút thêm giỏ hàng nếu chưa bán */}
                                    {product.status === 'available' ? (
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-teal-600 transition-colors shadow-lg shadow-gray-900/20"
                                        >
                                            <ShoppingCart size={14} />
                                        </button>
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center text-gray-300">
                                            <ShoppingCart size={14} />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                                    <img src={product.seller.avatar} className="w-5 h-5 rounded-full" alt="" />
                                    <span className="text-xs text-gray-500 font-medium truncate">{product.seller.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Search size={32} />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">Không tìm thấy sản phẩm</h3>
                        <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        <button 
                            onClick={() => {
                                setSearchTerm('');
                                setCategory('all');
                                setPriceRange([0, globalMaxPrice]);
                                setShowAvailableOnly(false); // Reset để hiện tất cả
                            }}
                            className="mt-4 text-teal-600 font-bold hover:underline"
                        >
                            Xóa hết bộ lọc
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}