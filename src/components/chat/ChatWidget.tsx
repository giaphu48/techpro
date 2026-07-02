'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !isOpen) return;
      try {
        const response = await api.get('/api/chat');
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error('Failed to fetch chat history', error);
      }
    };

    fetchHistory();
  }, [user, isOpen]);

  useEffect(() => {
    // Cuộn xuống cuối mỗi khi có tin nhắn mới
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || !user) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/api/chat', { content: userMessage.content });
      setMessages(prev => [...prev, response.data.message]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await api.delete('/api/chat');
      setMessages([]);
      setIsClearModalOpen(false);
    } catch (error) {
      console.error('Failed to clear chat', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden relative"
          >
            {/* Clear Chat Modal Overlay */}
            <AnimatePresence>
              {isClearModalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-5 w-full max-w-sm border border-zinc-200 dark:border-zinc-800"
                  >
                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Làm mới cuộc trò chuyện?</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                      Toàn bộ lịch sử tin nhắn sẽ bị xóa và không thể khôi phục. Bạn có chắc chắn không?
                    </p>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setIsClearModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleClearChat}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm shadow-red-500/20 transition-colors"
                      >
                        Đồng ý xóa
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">TechPro Assistant</h3>
                  <p className="text-xs text-green-500">{user ? 'Online' : 'Yêu cầu đăng nhập'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {user && (
                  <button
                    onClick={() => setIsClearModalOpen(true)}
                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                    title="Làm mới cuộc trò chuyện"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!user ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-2">
                  <User size={32} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Cần đăng nhập</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Vui lòng đăng nhập để chat với AI và lưu lại cuộc trò chuyện cá nhân của bạn.
                  </p>
                </div>
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors w-full shadow-sm shadow-blue-500/20"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            ) : (
              <>
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50">
                      <Bot size={48} className="text-zinc-400" />
                      <p className="text-sm text-zinc-500">Xin chào! Tôi có thể giúp gì cho bạn hôm nay?</p>
                    </div>
                  )}
                  {messages.filter(m => m.role !== 'system').map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm'
                          }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-full transition-colors flex items-center justify-center shrink-0 w-10 h-10"
                    >
                      <Send size={18} className="ml-1" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
