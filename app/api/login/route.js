import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        if (!email || !password)
        return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });

        const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        });

        const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
        await connection.end();

        if (rows.length === 0)
        return NextResponse.json({ error: "Email tidak ditemukan" }, { status: 401 });

        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
        return NextResponse.json({ error: "Password salah" }, { status: 401 });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const res = NextResponse.json({ message: "Login berhasil" });
        res.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 3600 });
        return res;
    } catch (err) {
        console.error("❌ Error login:", err);
        return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
    }
}
