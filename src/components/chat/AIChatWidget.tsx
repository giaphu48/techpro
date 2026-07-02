'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, RotateCcw, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Link from 'next/link';

export function AIChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: 'Xin chào! Tôi là trợ lý ảo của TechPro. Tôi có thể giúp gì cho bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Load chat session if it exists in localStorage
  useEffect(() => {
    const loadSession = async () => {
      if (!user) {
        setSessionId(null);
        setMessages([{ role: 'ai', content: 'Xin chào! Tôi là trợ lý ảo của TechPro. Tôi có thể giúp gì cho bạn?' }]);
        localStorage.removeItem('techpro_chat_session_id');
        return;
      }

      const storedSessionId = localStorage.getItem('techpro_chat_session_id');
      if (storedSessionId) {
        try {
          setIsLoading(true);
          const response = await api.get(`/api/chat/sessions/${storedSessionId}`);
          const dbMessages = response.data.messages || [];
          if (dbMessages.length > 0) {
            const formatted = dbMessages.map((m: any) => ({
              role: m.role === 'assistant' ? 'ai' : 'user',
              content: m.content
            }));
            setMessages([
              { role: 'ai', content: 'Xin chào! Tôi là trợ lý ảo của TechPro. Tôi có thể giúp gì cho bạn?' },
              ...formatted
            ]);
            setSessionId(storedSessionId);
          } else {
            setSessionId(storedSessionId);
          }
        } catch (error) {
          console.error('Lỗi khi tải phiên chat cũ:', error);
          // If session doesn't exist or is invalid, clear it
          localStorage.removeItem('techpro_chat_session_id');
          setSessionId(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isOpen) {
      loadSession();
    }
  }, [user, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await api.post('/api/chat', {
        message: userMessage,
        sessionId: sessionId || undefined,
      });

      const responseSessionId = response.data.sessionId;
      if (responseSessionId && responseSessionId !== sessionId) {
        setSessionId(responseSessionId);
        localStorage.setItem('techpro_chat_session_id', responseSessionId);
      }

      setMessages(prev => [...prev, { role: 'ai', content: response.data.response }]);
    } catch (error: any) {
      console.error('Lỗi khi gọi API chat:', error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: error.response?.data?.message || 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    setIsDeleting(true);
    try {
      if (sessionId) {
        await api.delete(`/api/chat/sessions/${sessionId}`);
      }
      setMessages([{ role: 'ai', content: 'Xin chào! Tôi là trợ lý ảo của TechPro. Tôi có thể giúp gì cho bạn?' }]);
      setSessionId(null);
      localStorage.removeItem('techpro_chat_session_id');
      toast.success('Đã xóa phiên chat cũ và bắt đầu phiên chat mới!');
    } catch (error) {
      console.error('Lỗi khi xóa phiên chat:', error);
      toast.error('Có lỗi xảy ra khi xóa phiên chat. Vui lòng thử lại!');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col relative"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black dark:bg-zinc-800 text-white">
              <div className="flex items-center gap-2">
                <MessageSquare size={20} />
                <h3 className="font-semibold text-sm sm:text-base">AI Assistant</h3>
              </div>
              <div className="flex items-center gap-1.5">
                {user && (messages.length > 1 || sessionId) && (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="p-1 hover:bg-white/10 dark:hover:bg-zinc-700 rounded-full transition-colors text-gray-300 hover:text-white"
                    title="Phiên chat mới"
                    aria-label="New chat session"
                  >
                    <RotateCcw size={18} />
                  </button>
                )}
                <button 
                  onClick={toggleChat}
                  className="p-1 hover:bg-white/10 dark:hover:bg-zinc-700 rounded-full transition-colors text-gray-300 hover:text-white"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {!user ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gray-50 dark:bg-zinc-900/50">
                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-500">
                  <MessageSquare size={24} />
                </div>
                <h4 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 mb-2">Trợ lý ảo TechPro</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 max-w-[240px] leading-relaxed">
                  Vui lòng đăng nhập tài khoản của bạn để bắt đầu cuộc trò chuyện với trợ lý ảo của chúng tôi.
                </p>
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-md text-xs"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-900/50">
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          msg.role === 'user' 
                            ? 'bg-black text-white rounded-br-none' 
                            : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
                  <form onSubmit={handleSend} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-4 py-2 bg-gray-100 dark:bg-zinc-800 border-transparent focus:bg-white dark:focus:bg-zinc-900 border focus:border-black dark:focus:border-white rounded-full outline-none text-sm transition-all text-black dark:text-white"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full disabled:opacity-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* Confirmation Overlay */}
            <AnimatePresence>
              {showConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-2xl border border-gray-200 dark:border-zinc-800 text-center max-w-[280px]"
                  >
                    <div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto mb-3 text-red-500 dark:text-red-400">
                      <AlertTriangle size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">Xóa phiên chat cũ?</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                      Lịch sử trò chuyện hiện tại sẽ bị xóa vĩnh viễn trên cả hệ thống. Bạn có muốn tiếp tục?
                    </p>
                    <div className="flex gap-2.5 justify-center">
                      <button
                        onClick={() => setShowConfirm(false)}
                        disabled={isDeleting}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-gray-700 dark:text-gray-300 disabled:opacity-50"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleNewChat}
                        disabled={isDeleting}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-red-650 hover:bg-red-700 text-white transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          'Xác nhận'
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}

