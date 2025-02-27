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
    return res.status(400).json({ message: "Missing  payload" });
  }

  try {

    const decryptedData = CryptoJS.AES.decrypt(req.body.data, "Nishant").toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      return res.status(400).json({ message: "Invalid encrypted data" });
    }

    const { email, password } = JSON.parse(decryptedData);


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "User doesn't exists" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateToken({ id: user.id, username: user.username });

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, 
      path: "/",
      sameSite: "Strict",
    });

    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
