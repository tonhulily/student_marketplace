import calculusImg from '../assets/calculus_ii.jpg';
import casioImg from '../assets/casio_580vnx.png';

export interface User {
  id: string;
  name: string;
  avatar: string;
  school: string;
  isVerified: boolean;
  rating: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  // UPDATE: Thêm trạng thái 'pending'
  status: 'available' | 'sold' | 'pending';
  condition: 'Mới 100%' | 'Như mới (99%)' | 'Cũ (80-90%)' | 'Xác máy';
  description: string;
  seller: User;
  postedAt: string;
  timestamp: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  partner: User;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export const CURRENT_USER: User = {
  id: 'abc@sis.hust.edu.vn',
  name: 'Bạn',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  school: 'Đại học Bách Khoa HN',
  isVerified: true,
  rating: 5,
};

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Trần Văn B',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    school: 'Đại học Kinh Tế Quốc Dân',
    isVerified: true,
    rating: 4.8,
  },
  {
    id: 'u2',
    name: 'Lê Thị C',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Caty',
    school: 'Đại học Ngoại Thương',
    isVerified: true,
    rating: 5.0,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Giáo trình Giải tích 1 & 2 (Bách Khoa)',
    price: 50000,
    image: calculusImg,
    category: 'Sách/Tài liệu',
    status: 'available',
    condition: 'Cũ (80-90%)',
    description: 'Sách mình dùng kỳ trước, có highlight vài chỗ quan trọng. Pass lại giá rẻ cho các bạn K69.',
    seller: CURRENT_USER,
    postedAt: '2 giờ trước',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: 'p2',
    title: 'Máy tính Casio FX 580VN X',
    price: 350000,
    image: casioImg,
    category: 'Đồ dùng học tập',
    status: 'available',
    condition: 'Như mới (99%)',
    description: 'Máy mới mua nhưng được tặng máy khác nên pass lại. Còn bảo hành 1 năm.',
    seller: MOCK_USERS[0],
    postedAt: '1 ngày trước',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
  },
  {
    id: 'p3',
    title: 'Bàn học gấp gọn thông minh',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800',
    category: 'Nội thất',
    status: 'sold',
    condition: 'Cũ (80-90%)',
    description: 'Chuyển trọ nên cần pass gấp. Bàn hơi xước ở góc nhưng vẫn dùng tốt.',
    seller: MOCK_USERS[1],
    postedAt: '3 ngày trước',
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'p4',
    title: 'Tai nghe Bluetooth Sony (Cũ)',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Công nghệ',
    status: 'available',
    condition: 'Cũ (80-90%)',
    description: 'Pin trâu nghe được 2 ngày. Bass ấm.',
    seller: MOCK_USERS[0],
    postedAt: '5 giờ trước',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
  },
  // UPDATE: Thêm sản phẩm mẫu đang chờ duyệt để test
  {
    id: 'p5',
    title: 'Loa JBL Go 3 (Chờ duyệt)',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&q=80&w=800',
    category: 'Công nghệ',
    status: 'pending',
    condition: 'Như mới (99%)',
    description: 'Test tính năng sản phẩm chờ duyệt.',
    seller: CURRENT_USER,
    postedAt: 'Vừa xong',
    timestamp: Date.now(),
  },
];

export const CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'c1',
    partner: MOCK_USERS[0],
    lastMessage: 'Trần Văn B: Mình ở khu KTX NEU.',
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Chào bạn, máy tính còn không ạ?', timestamp: '10:00' },
      { id: 'm2', senderId: 'u1', text: 'Còn bạn nhé, bạn qua trường mình xem máy được không?', timestamp: '10:05' },
      { id: 'm3', senderId: 'u1', text: 'Mình ở khu KTX NEU.', timestamp: '10:06' },
    ]
  },
];