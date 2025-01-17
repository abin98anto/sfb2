import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { comments } from "../constants/comments";
dotenv.config();

const SALT = Number(process.env.SALT!);

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT);
  } catch (error) {
    console.log(comments.HASH_FAIL, error);
    return "";
  }
}
