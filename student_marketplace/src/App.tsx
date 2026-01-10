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
import { AuthProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import { ProductProvider } from "./contexts/ProductContext";
import { ChatProvider } from "./contexts/ChatContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <ChatProvider>
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
                <Route path="/create-post" element={<CreatePostPage />} />

                {/* PROFILE */}
                <Route path="/profile/me" element={<ProfilePage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />

                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </CartProvider>
          </ChatProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
