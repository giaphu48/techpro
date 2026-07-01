'use client';

import { useState } from 'react';

export function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Vui lòng nhập định dạng email hợp lệ (ví dụ: name@example.com).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="register" className="py-24 bg-indigo-600 dark:bg-indigo-900 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 dark:bg-indigo-800 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500 dark:bg-purple-800 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Đừng bỏ lỡ ưu đãi độc quyền
          </h2>
          <p className="text-lg text-indigo-100 mb-10">
            Đăng ký nhận bản tin để là người đầu tiên sở hữu tai nghe Sony ULT WEAR với mức giá ưu đãi nhất cùng nhiều quà tặng hấp dẫn.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn..."
                className="flex-1 w-full px-6 py-4 rounded-full border-2 border-transparent bg-white/10 dark:bg-black/20 text-white placeholder-indigo-200 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap shadow-lg"
              >
                {status === 'loading' ? 'Đang xử lý...' : status === 'success' ? 'Đã đăng ký!' : 'Đăng ký ngay'}
              </button>
            </div>
            {status === 'success' && (
              <p className="absolute -bottom-8 left-0 right-0 text-green-300 text-sm mt-2 font-medium">
                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.
              </p>
            )}
            {status === 'error' && (
              <p className="absolute -bottom-8 left-0 right-0 text-red-300 text-sm mt-2 font-medium">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
