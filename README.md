# TechPro - Tai Nghe Sony Chính Hãng

![TechPro](https://res.cloudinary.com/dlzfacstr/image/upload/v1783021515/TechProLogo_nbnsti.png)

## Giới thiệu
**TechPro** là một nền tảng thương mại điện tử chuyên cung cấp các sản phẩm tai nghe Sony chính hãng. Dự án được xây dựng với mục tiêu mang đến trải nghiệm mua sắm mượt mà, hiện đại với giao diện người dùng bắt mắt, hiệu ứng mượt mà và tối ưu hóa hiệu suất tối đa.

🔗 **Backend Repository:** [techpro-server](https://github.com/giaphu48/techpro-server)

## Công nghệ sử dụng
Dự án được phát triển bằng các công nghệ web hiện đại nhất:
- **Core Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Thông báo (Toasts):** [Sonner](https://sonner.emilkowal.ski/)
- **Validation:** [Zod](https://zod.dev/)

## Tính năng nổi bật
- 🛍️ **Cửa hàng trực tuyến:** Trưng bày và tìm kiếm danh sách sản phẩm tai nghe đa dạng.
- 🛒 **Quản lý Giỏ hàng:** Thêm, sửa, xóa sản phẩm và tiến hành thanh toán mượt mà.
- 🔐 **Xác thực người dùng:** Hệ thống đăng nhập, đăng ký và quản lý tài khoản an toàn.
- ❤️ **Sản phẩm yêu thích:** Lưu lại những sản phẩm yêu thích (Favorites).
- 🌓 **Giao diện Sáng/Tối:** Hỗ trợ Dark/Light mode tự động theo hệ thống hoặc tùy chỉnh.
- 📱 **Responsive Design:** Trải nghiệm hoàn hảo trên mọi kích thước màn hình (Mobile, Tablet, Desktop).
- ⚡ **SEO & Hiệu suất:** Tối ưu SEO và phân tích hiệu suất thực tế với `@vercel/speed-insights`.

## Hướng dẫn Cài đặt & Khởi chạy

1. **Clone dự án về máy:**
   ```bash
   git clone <đường-dẫn-repo-của-bạn>
   cd techpro
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   # hoặc
   yarn install
   # hoặc
   pnpm install
   ```

3. **Thiết lập biến môi trường:**
   Đảm bảo bạn đã cấu hình file `.env` ở thư mục gốc của dự án với các API keys hoặc cấu hình cần thiết.

4. **Khởi chạy Development Server:**
   ```bash
   npm run dev
   ```

5. **Trải nghiệm:**
   Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Cấu trúc thư mục chính
```text
src/
├── app/          # Chứa các Route pages và Layouts theo chuẩn Next.js App Router
├── components/   # Các UI components được tái sử dụng (auth, home, layout, products, chat...)
├── context/      # Quản lý Global State (CartContext, AuthContext)
└── ...           # Các tiện ích và cấu hình khác
```

## Triển khai (Deploy)
Cách đơn giản và tối ưu nhất để triển khai dự án Next.js này là sử dụng [Vercel Platform](https://vercel.com/new).

Tham khảo thêm tại [Tài liệu triển khai Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
