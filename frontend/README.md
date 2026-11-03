# Kampüs Etkinlik Yönetim Sistemi (Vize Projesi)

Bu proje React, TypeScript ve Context API kullanılarak geliştirilmiş kampüs etkinlik yönetim uygulamasıdır.

## 🚀 Canlı Yayın
Vercel Adresi: [https://alarayuceturk-frontend.vercel.app](https://alarayuceturk-frontend.vercel.app)

## 📌 Özellikler
- 10 Adet Router Tanımı (`/`, `/events`, `/events/:id`, `/admin`, `/admin/new`, `/admin/edit/:id`, `/login`, `/register`, `/forgot-password`, `*`)
- Context API ile Global State Yönetimi & CRUD Operasyonları
- Silme işlemi öncesinde `window.confirm` onay penceresi
- Form Validation (Giriş, Kayıt, Şifremi Unuttum ve Etkinlik Ekle/Düzenle formlarında zorunlu alan doğrulaması)
- Responsive (Mobil ve Masaüstü tam uyumlu) tasarım

## 🛠️ Yerel Kurulum
```bash
npm install
npm run dev