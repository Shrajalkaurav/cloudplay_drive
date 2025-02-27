import prisma from "../lib/prismaClient.js";

const total = await prisma.file.count();
const records = await prisma.file.findMany();
export const data = {
  total: total,
  documents: records,
};
