'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { toast } from 'sonner';

const emailSchema = z.string().email('Vui lòng nhập định dạng email hợp lệ (ví dụ: name@example.com).');

export function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setStatus('error');
      const errorMsg = validation.error.issues[0].message;
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Sử dụng webhook URL từ biến môi trường, hoặc một URL test mặc định
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://webhook.site/5cc69ec9-20e3-40e1-bbcb-7cda2cc88d40';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Sử dụng no-cors để tránh lỗi CORS khi gọi đến các webhook service public
        body: JSON.stringify({
          email,
          source: 'TechPro Landing Page',
          timestamp: new Date().toISOString()
        }),
      });

      setStatus('success');
      setEmail('');
      toast.success('Đăng ký thành công! Dữ liệu đã được gửi.');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
      toast.error('Có lỗi kết nối. Vui lòng thử lại sau.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="register" className="py-24 bg-indigo-600 dark:bg-indigo-900 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 dark:bg-indigo-800 rounded-full blur-3xl opacity-50 animate-blob" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500 dark:bg-purple-800 rounded-full blur-3xl opacity-50 animate-blob-delayed" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => toast.success('Đăng ký ngay để nhận thông báo về những ưu đãi mới nhất!')}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap shadow-lg"
              >
                {status === 'loading' ? 'Đang xử lý...' : status === 'success' ? 'Đã đăng ký!' : 'Đăng ký ngay'}
              </motion.button>
            </div>
            <div className="min-h-[2rem] mt-3">
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-300 text-sm font-medium"
                >
                  Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-sm font-medium"
                >
                  {errorMessage}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
