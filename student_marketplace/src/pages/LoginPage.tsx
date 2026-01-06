import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      alert('Đăng nhập thành công!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-teal-300 rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-emerald-300 rounded-full blur-[120px] opacity-40 mix-blend-multiply"></div>

      {/* Glass Card */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10">
        <Link
          to="/"
          className="absolute top-8 left-8 text-gray-400 hover:text-gray-800 transition-colors bg-white/50 p-2 rounded-full hover:bg-white"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
            Chào bạn! 👋
          </h1>
          <p className="text-gray-500 font-medium">Đăng nhập để săn đồ giá hời.</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            label="Email"
            placeholder="example@hust.edu.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm font-bold text-teal-600 hover:text-teal-700 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          <Button className="w-full rounded-2xl text-lg h-14 mt-4 shadow-lg shadow-teal-500/30">
            Đăng nhập
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 font-medium">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-bold text-teal-600 hover:underline text-base"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}