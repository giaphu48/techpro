'use client';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

const specs = [
  { label: 'Bộ màng loa', value: '40 mm (Loại vòm)' },
  { label: 'Công nghệ âm thanh', value: 'ULT Power Sound, DSEE, 360 Reality Audio' },
  { label: 'Chống ồn', value: 'Cảm biến tiếng ồn kép, Bộ xử lý tích hợp V1' },
  { label: 'Thời lượng pin', value: 'Tối đa 30 giờ (Bật ANC) / 50 giờ (Tắt ANC)' },
  { label: 'Kết nối', value: 'Bluetooth® 5.2 (SBC, AAC, LDAC), Multipoint Connection' },
  { label: 'Tính năng thông minh', value: 'Cảm biến đeo tháo tai nghe (Wearing Sensor)' },
  { label: 'Trọng lượng', value: 'Xấp xỉ 255g' },
  { label: 'Ứng dụng hỗ trợ', value: 'Sony | Sound Connect (EQ tùy chỉnh)' },
];

export function TechSpecs() {
  return (
    <section id="specs" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => toast.success('Bạn đang xem thông số kỹ thuật!')}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Thông số kỹ thuật
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Uy lực âm thanh từ bên trong.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 p-6 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 md:mb-0">
                  {spec.label}
                </div>
                <div className="md:col-span-2 text-base text-gray-900 dark:text-white font-medium">
                  {spec.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
