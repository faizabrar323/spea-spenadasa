# 🚀 Osten AI - Chat Assistant dengan Backend

AI asisten super cerdas yang bisa jawab SEMUA pertanyaan - dari matematika, sejarah, fisika, coding, sampai tips hidup sehari-hari!

## ✨ Fitur

- 🧠 **Unlimited Knowledge** - Matematika, Fisika, Kimia, Sejarah, Programming, dll
- 💬 **Bahasa Santai** - Ngobrol natural kayak sama teman
- 🔒 **Secure Backend** - API key tersimpan aman di server
- 🎨 **UI Keren** - Design futuristic dengan animasi smooth
- 💾 **Context Memory** - Inget percakapan sebelumnya

## 📋 Prerequisites

Yang kamu butuhkan:
- **Node.js** (versi 14 atau lebih baru)
- **npm** (otomatis terinstall sama Node.js)

Cek apakah sudah terinstall:
```bash
node --version
npm --version
```

Kalau belum ada, download di: https://nodejs.org/

## 🛠️ Cara Install & Jalankan

### 1️⃣ Install Dependencies

Buka terminal/command prompt di folder `osten-ai-backend`, lalu jalankan:

```bash
npm install
```

### 2️⃣ Jalankan Server

```bash
npm start
```

Tunggu sampai muncul pesan:
```
🚀 Osten AI Backend running on http://localhost:3000
📡 API endpoint: http://localhost:3000/api/chat
```

### 3️⃣ Buka di Browser

Buka browser dan kunjungi:
```
http://localhost:3000
```

**DONE!** 🎉 Sekarang kamu bisa chat dengan Osten AI!

## 📁 Struktur File

```
osten-ai-backend/
├── server.js           # Backend server (Express.js)
├── package.json        # Dependencies & scripts
├── .env                # API key & config (JANGAN SHARE!)
├── public/
│   └── index.html      # Frontend UI
└── README.md           # Dokumentasi ini
```

## 🔑 Konfigurasi API Key

API key sudah diset di file `.env`:
```
GEMINI_API_KEY=AIzaSyDlYJBpMm6YqkYqFmQ9nipAT6Z7YYaOqZY
PORT=3000
```

Kalau mau ganti API key, edit file `.env` aja.

## 💡 Tips Penggunaan

**Contoh pertanyaan:**
- "Jelasin rumus Einstein E=mc² dong"
- "Ceritain perang Diponegoro"
- "Gimana cara bikin bubble sort di Python?"
- "Apa itu fotosintesis? Jelasin step by stepnya"
- "Hitung integral dari x² + 2x"
- "Kenapa langit biru?"

**Tips:**
- Tanya dengan bahasa santai, Osten bakal jawab santai juga!
- Bisa follow-up pertanyaan, Osten inget konteks percakapan
- Kalau minta code, bakal dikasih contoh yang bisa langsung dipake

## 🐛 Troubleshooting

**Error: "Cannot find module"**
→ Jalankan: `npm install`

**Error: "Port 3000 is already in use"**
→ Ubah port di `.env` jadi 3001 atau port lain

**Error: "Backend server belum jalan"**
→ Pastikan udah jalanin `npm start` di terminal

**Chat gak muncul response**
→ Cek console browser (F12) untuk error
→ Pastikan server masih jalan

## 🚀 Deploy ke Production

### Deploy ke Vercel (Gratis!)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow instruksi, terus vercel bakal kasih URL live!

## 📝 Notes

- Backend pakai **Express.js** + **Gemini API**
- Frontend pakai **Vanilla JavaScript** (no framework)
- API key tersimpan aman di server (tidak exposed ke browser)
- Gratis unlimited usage dengan Gemini API!

## 🎯 Tech Stack

- **Backend**: Node.js + Express.js
- **AI**: Google Gemini API
- **Frontend**: HTML5 + CSS3 + Vanilla JS
- **Styling**: Custom CSS (no framework)

---

Made with ❤️ for awesome conversations!