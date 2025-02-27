import { serialize } from "cookie";
import { generateToken } from "../auth/helper";
import prisma from "../../../../lib/prismaClient";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!req.body.data) {
    return res.status(400).json({ message: "Missing payload" });
  }

  try {
    // Decrypt incoming data
    const bytes = CryptoJS.AES.decrypt(req.body.data, "Nishant");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) {
      return res.status(400).json({ message: "Invalid encrypted data" });
    }

    const { username, email, password } = JSON.parse(decryptedData);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email is already registered
    const existingUser = await prisma.admin.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newUser = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = generateToken({ id: newUser.id, username: newUser.username });

    // Set HttpOnly cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      })
    );

    res.status(201).json({ message: "Signup successful", user: { username, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
