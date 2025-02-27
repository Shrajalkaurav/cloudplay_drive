import { verifyToken } from "../auth/helper";
import prisma from "../../../../lib/prismaClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await prisma.admin.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
