import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const SALT = Number(process.env.SALT!);

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT);
  } catch (error) {
    console.log("error hashing password", error);
    return "";
  }
}
