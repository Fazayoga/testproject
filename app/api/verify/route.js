import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kirim data user (misal: id dan email)
    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
      },
    });
  } catch (err) {
    console.error("JWT verify error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
