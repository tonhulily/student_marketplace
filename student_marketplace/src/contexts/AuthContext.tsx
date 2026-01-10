import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, CURRENT_USER } from '../mock/data';
import { getAvatarUrl } from '../lib/utils';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => boolean;
    register: (name: string, email: string, school: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // FIX: Sửa logic khởi tạo state
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('auth_user_v3');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Nếu là 'me' thì lấy data mới nhất từ code để đồng bộ
                if (parsed.id === 'me') return CURRENT_USER;
                return parsed;
            } catch (e) {
                return null;
            }
        }
        // QUAN TRỌNG: Nếu không có gì trong storage, trả về null (Chưa đăng nhập)
        // Thay vì trả về CURRENT_USER như trước đây.
        return null; 
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('auth_user_v2', JSON.stringify(user));
        } else {
            localStorage.removeItem('auth_user_v2');
        }
    }, [user]);

    const login = (email: string) => {
        // Logic login vẫn giữ nguyên
        if (email === 'me' || email === CURRENT_USER.id || email === 'admin') {
            setUser(CURRENT_USER);
            return true;
        }

        const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundUser = savedUsers.find((u: User) => u.id === email);

        if (foundUser) {
            setUser(foundUser);
            return true;
        }

        // Mock login cho user test khác
        const mockUser = {
            id: email,
            name: 'Người dùng Test',
            avatar: getAvatarUrl(email),
            school: 'Đại học Test',
            isVerified: true,
            rating: 5
        };
        setUser(mockUser);
        return true;
    };

    const register = (name: string, email: string, school: string) => {
        const newUser: User = {
            id: email,
            name: name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            school: school,
            isVerified: true,
            rating: 0
        };
        
        // Lưu user mới đăng ký vào list users
        const currentUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        localStorage.setItem('registeredUsers', JSON.stringify([...currentUsers, newUser]));
        
        // Đăng nhập luôn sau khi đăng ký
        setUser(newUser);
        return true;
    };

    const logout = () => {
        setUser(null);
        // Có thể thêm điều hướng về trang login/home ở đây nếu cần thiết ở tầng component
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}