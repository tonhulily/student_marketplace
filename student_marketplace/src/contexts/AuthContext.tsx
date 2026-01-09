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
    // FIX: Dùng key mới '_v2' để bỏ qua dữ liệu rác cũ trong máy bạn
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('auth_user_v2');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Nếu dữ liệu cũ lưu ID là 'me', hãy force dùng data mới nhất từ code để avatar luôn đúng
                if (parsed.id === 'me') return CURRENT_USER;
                return parsed;
            } catch (e) {
                return CURRENT_USER;
            }
        }
        // Mặc định luôn là CURRENT_USER (chính chủ)
        return CURRENT_USER;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('auth_user_v2', JSON.stringify(user));
        } else {
            localStorage.removeItem('auth_user_v2');
        }
    }, [user]);

    const login = (email: string) => {
        // FIX: Bất kỳ khi nào đăng nhập với 'me' hoặc email mặc định, trả về CURRENT_USER chuẩn
        if (email === 'me' || email === CURRENT_USER.id) {
            setUser(CURRENT_USER);
            return true;
        }
        
        // Logic giả lập cho user khác
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
        // Đơn giản hóa cho demo
        const newUser: User = {
            id: email,
            name: name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            school: school,
            isVerified: true,
            rating: 0
        };
        setUser(newUser);
        return true;
    };

    const logout = () => {
        setUser(null);
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