# Next.js React Dashboard Project

A simple modern web application with authentication, protected dashboard, and responsive mobile support. Built with **Next.js**, **React**, **Bootstrap**, and **MySQL**.

---

## 💻 Tech Stack

- **Frontend:** React.js (Next.js App Router)
- **Backend:** Next.js API Routes (Node.js)
- **Database:** MySQL
- **Authentication:** JWT + HttpOnly Cookie
- **Password Hashing:** bcrypt
- **Styling:** Bootstrap 5 + Bootstrap Icons
- **Other:** Fetch API, React Hooks

---

## 📁 Project Structure

project-root/
│
├─ app/ # Next.js App Router
│ ├─ login/page.js # Login page
│ ├─ dashboard/page.js # Protected Dashboard
│ └─ layout.js # Root Layout & CSS imports
│
├─ pages/api/ # API Routes
│ ├─ login.js # Login endpoint
│ ├─ logout.js # Logout endpoint
│ └─ verify.js # JWT verification endpoint
│
├─ lib/ # Helper functions
│ └─ db.js # MySQL connection
│
├─ .env.local # Environment variables
├─ package.json
└─ README.md


### Arsitektur

1. **Frontend (Next.js + React)**  
   - Halaman `login` untuk autentikasi.
   - Halaman `dashboard` protected route, hanya bisa diakses jika JWT valid.
   - Responsive UI dengan **Bootstrap 5** dan sidebar collapsible.
   - Dark/Light mode toggle.
   - Sidebar mobile overlay dengan blur & tombol X untuk menutup.

2. **Backend (Next.js API Routes)**  
   - `api/login` → menerima email & password, memvalidasi, hash password dengan bcrypt, mengeluarkan JWT.
   - `api/logout` → menghapus HttpOnly cookie.
   - `api/verify` → memeriksa JWT valid untuk protected route.

3. **Database (MySQL)**  
   - Menyimpan data user dengan kolom `id`, `email`, `password` (hashed), dan metadata lainnya.
   - Koneksi dibuat di `lib/db.js`.

4. **Authentication**  
   - Password di-hash menggunakan **bcrypt**.
   - JWT disimpan di **HttpOnly cookie**, aman dari XSS.
   - Setiap request ke protected route diverifikasi JWT di backend.

---

## 🚀 Cara Menjalankan Project

1. **Clone repository**
```bash
git clone <repository-url>
cd <project-folder>
```

2. **Install dependencies**
```bash
npm install
```
3. **Setup database MySQL**
```bash
CREATE DATABASE testproject;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
4. **Buat file .env.local**
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=testproject
JWT_SECRET=mysecret
COOKIE_SECURE=false
```
5. **Jalankan development server**
```bash
npm run dev
```
6. **Buka di browser**
```bash
http://localhost:3000/login
```
7. **Test login**
```bash
Masukkan email dan password yang sudah terdaftar di database.
Jika berhasil, akan diarahkan ke /dashboard.

email : adminbaru1029@gmail.com
pass  : kepobanget0011
```