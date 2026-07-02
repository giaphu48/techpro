'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await api.post('/api/users/login', { email, password });
        login(response.data.user, response.data.token);
        toast.success('Đăng nhập thành công!');
        router.push('/');
      } else {
        if (password !== confirmPassword) {
          toast.error('Mật khẩu không khớp!');
          setIsLoading(false);
          return;
        }
        const response = await api.post('/api/users', { name, email, password });
        toast.success(response.data.message || 'Đăng ký thành công!');
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.message);
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full rounded-[2rem] bg-white/75 dark:bg-zinc-900/40 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/10 p-8 shadow-xl dark:shadow-2xl relative"
    >
      {/* Decorative inner glow */}
      <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none" />

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-950/50 rounded-2xl mb-8 relative z-10">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-3 text-sm font-semibold rounded-xl relative ${isLogin ? 'text-zinc-950 dark:text-white' : 'text-zinc-400 hover:text-zinc-700 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
        >
          {isLogin && (
            <motion.div
              layoutId="tab-background"
              className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm dark:shadow-none rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">Đăng nhập</span>
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative ${!isLogin ? 'text-zinc-950 dark:text-white' : 'text-zinc-400 hover:text-zinc-700 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
        >
          {!isLogin && (
            <motion.div
              layoutId="tab-background"
              className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm dark:shadow-none rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">Đăng ký</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <AnimatePresence mode="popLayout">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
            >
              <div
                className={`relative group rounded-xl border bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden ${focusedField === 'name' ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20'
                  }`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${focusedField === 'name' ? 'text-indigo-500 dark:text-indigo-400' : 'text-zinc-400 dark:text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 transition-all outline-none text-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`relative group rounded-xl border bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden ${focusedField === 'email' ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20'
            }`}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
            <Mail className={`h-5 w-5 ${focusedField === 'email' ? 'text-indigo-500 dark:text-indigo-400' : 'text-zinc-400 dark:text-gray-500'}`} />
          </div>
          <input
            type="email"
            placeholder="Email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 transition-all outline-none text-sm"
          />
        </div>

        <div
          className={`relative group rounded-xl border bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden ${focusedField === 'password' ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20'
            }`}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
            <Lock className={`h-5 w-5 ${focusedField === 'password' ? 'text-indigo-500 dark:text-indigo-400' : 'text-zinc-400 dark:text-gray-500'}`} />
          </div>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 transition-all outline-none text-sm"
          />
        </div>

        <AnimatePresence mode="popLayout">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
            >
              <div
                className={`relative group rounded-xl border bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden ${focusedField === 'confirmPassword' ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20'
                  }`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                  <Lock className={`h-5 w-5 ${focusedField === 'confirmPassword' ? 'text-indigo-500 dark:text-indigo-400' : 'text-zinc-400 dark:text-gray-500'}`} />
                </div>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 transition-all outline-none text-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-end pt-1"
            >
              <Link 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toast.info('Tính năng đang được phát triển');
                }}
                className="text-sm font-medium text-zinc-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full group flex items-center justify-center gap-2 py-4 bg-zinc-950 text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 font-bold rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <span>{isLogin ? 'Tiếp tục' : 'Tạo tài khoản'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
