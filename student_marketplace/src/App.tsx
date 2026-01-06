import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import MarketPage from "./pages/MarketPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ChatPage from "./pages/ChatPage";
import CreatePostPage from "./pages/CreatePostPage";
import CartPage from "./pages/CartPageFixed";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Route Đăng bán */}
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;