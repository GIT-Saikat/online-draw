import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET||"fallback"
// module.exports = {
//     JWT_SECRET: process.env.JWT_SECRET || "123123",
// };
  