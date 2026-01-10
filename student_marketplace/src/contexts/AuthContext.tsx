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

// Key lưu session (dùng sessionStorage để tự xóa khi tắt tab)
const STORAGE_KEY = 'marketplace_auth_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Khởi tạo state
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.id === 'me') return CURRENT_USER;
                return parsed;
            }
        } catch (e) {
            return null;
        }
        return null; // Mặc định là Guest
    });

    useEffect(() => {
        if (user) {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    const login = (email: string) => {
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
        
        const currentUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        localStorage.setItem('registeredUsers', JSON.stringify([...currentUsers, newUser]));
        
        setUser(newUser);
        return true;
    };

    // FIX: Thêm logic điều hướng về trang chủ khi logout
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem(STORAGE_KEY); // Xóa session ngay lập tức
        window.location.href = '/'; // Chuyển hướng cứng về root (localhost:3000)
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