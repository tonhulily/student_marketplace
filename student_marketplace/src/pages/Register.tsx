import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { ArrowLeft, School, Info } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check Email Domain
    if (!formData.email.endsWith('.edu.vn')) {
      alert('Vui lòng sử dụng email sinh viên (.edu.vn) để đăng ký!');
      return;
    }

    // 2. Mock Sending Verification Code
    alert(`Mã xác thực đã được gửi đến ${formData.email}.`);

    // 3. Prompt for Code
    const code = prompt('Nhập mã xác thực của bạn:');
    if (code === '123456') {
      // 4. Register
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      if (register(fullName, formData.email, formData.school)) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      }
    } else {
      alert('Mã xác thực không đúng!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[20%] right-[30%] w-[400px] h-[400px] bg-orange-200 rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-teal-200 rounded-full blur-[120px] opacity-40 mix-blend-multiply"></div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-lg relative z-10 my-10">
        <Link
          to="/"
          className="absolute top-8 left-8 text-gray-400 hover:text-gray-800 transition-colors bg-white/50 p-2 rounded-full hover:bg-white"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-8 mt-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 text-teal-600 mb-4 shadow-sm border border-white">
            <School size={28} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
            Gia nhập cộng đồng
          </h1>
          <p className="text-gray-500 font-medium">
            Xác thực sinh viên để giao dịch an toàn.
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Họ"
              placeholder="Nguyễn"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Tên"
              placeholder="Văn A"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Input
              label="Email trường (Bắt buộc)"
              type="email"
              placeholder="name@school.edu.vn"
              className="border-teal-200 focus:border-teal-500 bg-teal-50/30"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="absolute right-3 top-[38px] text-teal-400 group">
              <Info size={16} />
              {/* Tooltip mockup */}
              <div className="absolute hidden group-hover:block w-48 bg-gray-900 text-white text-xs p-2 rounded right-0 bottom-full mb-2">
                Bắt buộc dùng email đuôi .edu.vn
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2 p-3 bg-orange-50 rounded-xl border border-orange-100">
            <Info size={16} className="text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-700 font-medium">
              Chúng tôi sẽ gửi mã xác thực về email này để kiểm tra thông tin cơ sở giáo dục.
            </p>
          </div>

          <Input
            label="Tên trường Đại học/CĐ"
            placeholder="Đại học Bách Khoa..."
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label="Nhập lại mật khẩu"
            type="password"
            placeholder="••••••••"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="flex items-center gap-3 my-4">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 text-teal-600 rounded-md border-gray-300 focus:ring-teal-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600 font-medium">
              Tôi đồng ý với <a href="#" className="font-bold text-gray-900 hover:underline">Điều khoản & Quy định</a>
            </label>
          </div>

          <Button className="w-full rounded-2xl text-lg h-14 bg-gradient-to-r from-teal-600 to-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30">
            Xác thực & Đăng ký
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 font-medium">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-bold text-teal-600 hover:underline text-base"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}