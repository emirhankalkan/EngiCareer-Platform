import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Search, Send, User, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MessagesPage = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');

  // Mock chats
  const [chats, setChats] = useState([
    {
      id: 0,
      name: 'TechFlow Yazılım',
      lastMessage: 'Mülakat davetimizi aldınız mı?',
      time: '14:30',
      unread: 1,
      type: 'company',
      messages: [
        { id: 1, sender: 'company', text: 'Merhaba Ali Bey, başvurunuz için teşekkürler.', time: '10:00' },
        { id: 2, sender: 'candidate', text: 'Rica ederim, heyecanla bekliyorum.', time: '10:15' },
        { id: 3, sender: 'company', text: 'Mülakat davetimizi aldınız mı?', time: '14:30' },
      ]
    },
    {
      id: 1,
      name: 'CloudNine HR',
      lastMessage: 'Harika, teşekkürler!',
      time: 'Dün',
      unread: 0,
      type: 'company',
      messages: [
        { id: 1, sender: 'company', text: 'Yetenekleriniz ekibimizle eşleşiyor.', time: 'Dün' },
        { id: 2, sender: 'candidate', text: 'Harika, teşekkürler!', time: 'Dün' },
      ]
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: user?.role === 'company' ? 'company' : 'candidate',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedChats = [...chats];
    updatedChats[activeChat].messages.push(newMessage);
    updatedChats[activeChat].lastMessage = message;
    updatedChats[activeChat].time = newMessage.time;
    
    setChats(updatedChats);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl overflow-hidden flex">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 flex overflow-hidden min-h-[600px]">
          
          {/* Chat List Sidebar */}
          <div className="w-full md:w-80 border-r border-slate-100 flex flex-col">
            <div className="p-4 border-b border-slate-100">
               <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input placeholder="Mesajlarda ara..." className="pl-9 h-9 text-sm" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto">
               {chats.map((chat, index) => (
                 <div 
                   key={chat.id}
                   onClick={() => setActiveChat(index)}
                   className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${activeChat === index ? 'bg-indigo-50/50 border-r-2 border-indigo-600' : ''}`}
                 >
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                       {chat.type === 'company' ? <Building2 className="h-6 w-6 text-indigo-600" /> : <User className="h-6 w-6 text-indigo-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-slate-900 truncate text-sm">{chat.name}</h4>
                          <span className="text-[10px] text-slate-400">{chat.time}</span>
                       </div>
                       <p className="text-xs text-slate-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="h-4 w-4 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white">
                         {chat.unread}
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="hidden md:flex flex-1 flex-col">
             {/* Header */}
             <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    {chats[activeChat].type === 'company' ? <Building2 className="h-5 w-5 text-indigo-600" /> : <User className="h-5 w-5 text-indigo-600" />}
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">{chats[activeChat].name}</h3>
                   <span className="text-xs text-green-500 font-medium">Çevrimiçi</span>
                </div>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                {chats[activeChat].messages.map((m) => {
                  const isMe = m.sender === (user?.role === 'company' ? 'company' : 'candidate');
                  return (
                    <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                          <p>{m.text}</p>
                          <span className={`text-[10px] mt-1 block ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>{m.time}</span>
                       </div>
                    </div>
                  );
                })}
             </div>

             {/* Footer Input */}
             <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2">
                <Input 
                   placeholder="Mesajınızı yazın..." 
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   className="flex-1"
                />
                <Button type="submit" size="icon">
                   <Send className="h-4 w-4" />
                </Button>
             </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MessagesPage;
