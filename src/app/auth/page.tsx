import { Metadata } from 'next';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Đăng nhập & Đăng ký - TechPro',
  description: 'Truy cập tài khoản TechPro để tận hưởng các ưu đãi và dịch vụ tốt nhất.',
};

export default function AuthPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      {/* Immersive Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 dark:bg-purple-600/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Floating Centered Container */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3 drop-shadow-sm transition-colors duration-300">
            TechPro<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg transition-colors duration-300">Khám phá thế giới công nghệ</p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
}
