import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { Search, Send, Image, Smile, Phone, Video, MoreVertical, ArrowLeft, ShieldCheck } from 'lucide-react';
import { CHAT_SESSIONS as MOCK_SESSIONS, MOCK_USERS, ChatSession } from '../mock/data';

export default function ChatPage() {
   const { userId } = useParams();
   const [activeSessionId, setActiveSessionId] = useState<string>('');
   const [sessions, setSessions] = useState<ChatSession[]>(MOCK_SESSIONS);

   useEffect(() => {
      if (userId) {
         // Check if session exists
         const existingSession = sessions.find(s => s.partner.id === userId);
         if (existingSession) {
            setActiveSessionId(existingSession.id);
         } else {
            // Create temp session
            const user = MOCK_USERS.find(u => u.id === userId);
            if (user) {
               const newSession: ChatSession = {
                  id: `new_${userId}`,
                  partner: user,
                  lastMessage: 'Bắt đầu cuộc trò chuyện',
                  unreadCount: 0,
                  messages: []
               };
               setSessions(prev => [newSession, ...prev]);
               setActiveSessionId(newSession.id);
            }
         }
      } else {
         if (sessions.length > 0) setActiveSessionId(sessions[0].id);
      }
   }, [userId]);

   const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
   const [inputValue, setInputValue] = useState('');

   const handleSendMessage = () => {
      if (!inputValue.trim()) return;

      const newMessage = {
         id: `msg_${Date.now()}`,
         senderId: 'me',
         text: inputValue,
         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
         if (s.id === activeSession.id) {
            return {
               ...s,
               messages: [...s.messages, newMessage],
               lastMessage: 'Bạn: ' + inputValue,
               unreadCount: 0
            };
         }
         return s;
      }));
      setInputValue('');
   };

   return (
      <div className="h-screen w-full bg-[#F8F9FC] flex flex-col overflow-hidden">

         <div className="flex-none z-50">
            <Header />
         </div>

         <div className="flex-1 flex overflow-hidden relative w-full mx-auto border-x border-gray-100 bg-white shadow-sm">
            <div className="w-20 md:w-80 border-r border-gray-100 flex flex-col h-full bg-white flex-shrink-0">
               <div className="p-4 hidden md:block flex-none border-b border-gray-50">
                  <div className="relative">
                     <input type="text" placeholder="Tìm tin nhắn..." className="w-full bg-gray-100 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                     <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                  {sessions.map(session => (
                     <div
                        key={session.id}
                        onClick={() => setActiveSessionId(session.id)}
                        className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all mb-1 ${session.id === activeSessionId ? 'bg-teal-50' : 'hover:bg-gray-50'
                           }`}
                     >
                        <div className="relative flex-shrink-0">
                           <img src={session.partner.avatar} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200" alt="" />
                        </div>
                        <div className="hidden md:block flex-1 min-w-0">
                           <h4 className={`font-bold text-sm truncate ${session.id === activeSessionId ? 'text-teal-700' : 'text-gray-900'}`}>{session.partner.name}</h4>
                           <p className="text-xs text-gray-500 truncate">{session.lastMessage}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="flex-1 flex flex-col h-full bg-[#F8F9FC] min-w-0 relative">
               <div className="h-16 bg-white px-4 border-b border-gray-100 flex items-center justify-between flex-none z-10 shadow-sm">
                  <div className="flex items-center gap-3">
                     <div className="md:hidden"><ArrowLeft size={20} className="text-gray-500" /></div>
                     <img src={activeSession.partner.avatar} className="w-10 h-10 rounded-full" alt="" />
                     <div>
                        <h3 className="font-bold text-gray-900 text-sm md:text-base">{activeSession.partner.name}</h3>
                        <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><ShieldCheck size={10} /> Verified</span>
                     </div>
                  </div>

                  <div className="flex gap-2"><MoreVertical size={20} className="text-gray-400" /></div>
               </div>

               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fc]">
                  {activeSession.messages.map((msg) => {
                     const isMe = msg.senderId === 'me';
                     return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-gradient-to-br from-teal-600 to-green-500 text-white' : 'bg-white text-gray-800 border border-gray-100'
                              }`}>
                              {msg.text}
                           </div>
                        </div>
                     )
                  })}
               </div>

               <div className="flex-none p-3 bg-white border-t border-gray-100 z-20 w-full">
                  <div className="flex items-center gap-2 max-w-4xl mx-auto">
                     <Button variant="ghost" size="icon" className="text-gray-400 rounded-full flex-shrink-0"><Image size={20} /></Button>
                     <div className="flex-1 relative">
                        <input
                           type="text"
                           placeholder="Nhập tin nhắn..."
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                           className="w-full bg-gray-100 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                        />
                        <Smile size={18} className="absolute right-3 top-2.5 text-gray-400" />
                     </div>
                     <Button onClick={handleSendMessage} className="rounded-full w-10 h-10 p-0 flex-shrink-0"><Send size={16} /></Button>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
}