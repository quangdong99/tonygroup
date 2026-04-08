# TonyHome Landing Website

Website mẫu bất động sản đầy đủ các phần thường dùng (hero, tìm kiếm & lọc dự án, dịch vụ, testimonial, blog, form liên hệ).

## Cách chạy

Vì website dùng `fetch("config/site-content.json")`, bạn cần chạy qua server local (không mở trực tiếp bằng `file://`).

Ví dụ:

```bash
python3 -m http.server 5173
```

Sau đó mở `http://localhost:5173`.

## Chỉnh logo và ảnh (theo yêu cầu)

Toàn bộ nội dung và đường dẫn ảnh nằm ở:

- `config/site-content.json`

### Thay logo

Sửa trường:

```json
"brand": {
  "logo": "assets/images/logo.svg"
}
```

Bạn có thể đổi sang PNG/JPG/SVG tùy ý, ví dụ:

```json
"logo": "assets/images/my-new-logo.png"
```

### Thay ảnh các khu vực

Sửa các trường `image` tương ứng:

- Hero: `hero.image`
- Dự án: `projects[].image`
- Dịch vụ: `services[].image`
- Blog: `blogs[].image`
- Avatar khách hàng: `testimonial.avatar`
- Bản đồ: `contact.map`

Chỉ cần đặt ảnh mới vào thư mục `assets/images/` và cập nhật đường dẫn trong file JSON.

## Cấu trúc

- `index.html`: khung layout website.
- `assets/css/styles.css`: giao diện responsive.
- `assets/js/app.js`: render dữ liệu, lọc dự án, xử lý form.
- `config/site-content.json`: nội dung và ảnh có thể chỉnh sửa nhanh.
