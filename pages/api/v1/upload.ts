import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import prisma from "@/lib/prismaClient";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser for Multer
  },
};

// API Route Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return new Promise((resolve, reject) => {
    upload.single("file")(req as any, res as any, async (err) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }

      const file = (req as any).file;
      console.log(file);
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        // Save file data in MySQL
        const savedFile = await prisma.file.create({
          data: {
            title: file.originalname,
            url: `/uploads/${file.filename}`,
            type: file.mimetype,
            extension: path.extname(file.originalname),
            size: file.size,
            ownerId: "some-owner-id", // Change based on user session
          },
        });

        res.status(200).json({ message: "File uploaded", file: savedFile });
        resolve(null);
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
        reject(error);
      }
    });
  });
}
