# Kampüs Etkinlik Backend API

## Çalıştırma Komutları

```bash
npm install
npm run dev
``` 

## REST API Sözleşmesi

| Yöntem (HTTP Method) | Endpoint | Açıklama | Başarılı Yanıt Kodu |
| --- | --- | --- | --- |
| GET | /health | Sunucu sağlık durumunu ve öğrenci numarasını döner | 200 OK |
| GET | /events | Tüm etkinlik listesini döner | 200 OK |
| GET | /events/:id | Belirtilen ID'li etkinliğin detayını döner (Bulunamazsa 404) | 200 OK / 404 Not Found |
| POST | /events | Yeni etkinlik ekler (Eksik veri varsa 400) | 201 Created / 400 Bad Request |
| PUT | /events/:id | Belirtilen etkinliği günceller | 200 OK / 404 Not Found |
| DELETE | /events/:id | Belirtilen etkinliği siler | 200 OK / 404 Not Found |