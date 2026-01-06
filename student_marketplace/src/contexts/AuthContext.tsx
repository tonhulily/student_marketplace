import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../mock/data';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => boolean;
    register: (name: string, email: string, school: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('currentUser');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    const login = (email: string) => {
        // Mock login: Find user in localStorage 'registeredUsers' or just mock success if valid email
        // For this demo, let's just mock a user based on the email
        const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundUser = savedUsers.find((u: User) => u.id === email); // Using email as ID for simplicity in checking

        if (foundUser) {
            setUser(foundUser);
            return true;
        }

        // Fallback for demo: if email is from MOCK_USERS
        const mockUser = {
            id: 'user_new',
            name: 'Người dùng mới',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            school: 'Unknown',
            isVerified: true,
            rating: 5
        };
        // But request implies we need to use the REGISTERED account. 
        // So 'login' should really rely on the registration data.
        alert('Tài khoản không tồn tại. Vui lòng đăng ký trước.');
        return false;
    };

    const register = (name: string, email: string, school: string) => {
        const newUser: User = {
            id: email, // Use email as ID for simple lookup
            name: name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            school: school,
            isVerified: true,
            rating: 0
        };

        // Save to "DB"
        const currentUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        localStorage.setItem('registeredUsers', JSON.stringify([...currentUsers, newUser]));
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
