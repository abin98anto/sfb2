import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import { comments } from "../constants/comments";

const SALT = Number(process.env.SALT!);

const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, SALT);
  } catch (error) {
    console.log(comments.HASH_FAIL, error);
    return "";
  }
};

export default hashPassword;