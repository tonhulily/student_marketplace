import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatSession, CHAT_SESSIONS, MOCK_USERS } from '../mock/data';

interface ChatContextType {
    sessions: ChatSession[];
    sendMessage: (sessionId: string, text: string, senderId: string) => void;
    createSession: (partnerId: string) => string; // Trả về sessionId
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [sessions, setSessions] = useState<ChatSession[]>(() => {
        const saved = localStorage.getItem('chat_sessions');
        return saved ? JSON.parse(saved) : CHAT_SESSIONS;
    });

    // Tự động lưu vào LocalStorage mỗi khi sessions thay đổi
    useEffect(() => {
        localStorage.setItem('chat_sessions', JSON.stringify(sessions));
    }, [sessions]);

    const sendMessage = (sessionId: string, text: string, senderId: string) => {
        setSessions(prev => prev.map(session => {
            if (session.id === sessionId) {
                return {
                    ...session,
                    lastMessage: senderId === 'me' ? `Bạn: ${text}` : text,
                    timestamp: Date.now(), // Update time logic if needed
                    messages: [...session.messages, {
                        id: Date.now().toString(),
                        senderId,
                        text,
                        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    }]
                };
            }
            return session;
        }));
    };

    const createSession = (partnerId: string) => {
        // Kiểm tra xem đã có session với người này chưa
        const existing = sessions.find(s => s.partner.id === partnerId);
        if (existing) return existing.id;

        // Nếu chưa, tạo mới
        const partner = MOCK_USERS.find(u => u.id === partnerId) || {
             id: partnerId, name: 'User', avatar: '', school: '', isVerified: false, rating: 0 
        }; // Fallback nếu không tìm thấy user

        const newSession: ChatSession = {
            id: `session_${Date.now()}`,
            partner: partner,
            lastMessage: 'Bắt đầu cuộc trò chuyện',
            unreadCount: 0,
            messages: []
        };

        setSessions(prev => [newSession, ...prev]);
        return newSession.id;
    };

    return (
        <ChatContext.Provider value={{ sessions, sendMessage, createSession }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used within ChatProvider');
    return context;
}