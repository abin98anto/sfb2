import jwt from "jsonwebtoken";
import { JwtData } from "../../core/entities/misc/JwtData";
import { JwtInterface } from "../../core/interfaces/misc/JwtInterface";
import { comments } from "../../shared/constants/comments";

const ACCESS_SECRET = process.env.JWT_ACCESS!;
const ACCESS_EXPIRY = "50m";
const REFRESH_SECRET = process.env.JWT_REFRESH!;
const REFRESH_EXPIRY = "7d";

export class JwtService implements JwtInterface {
  generateAccessToken = (data: JwtData): string => {
    return jwt.sign(data, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
  };

  generateRefreshToken = (data: JwtData): string => {
    return jwt.sign(data, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
  };

  verifyAccessToken = (token: string): JwtData | null => {
    try {
      return jwt.verify(token, ACCESS_SECRET) as JwtData;
    } catch (error) {
      console.error(comments.ACCESS_INVLD, error);
      throw new Error(comments.ACCESS_INVLD);
    }
  };

  verifyRefreshToken = (token: string): JwtData => {
    try {
      return jwt.verify(token, REFRESH_SECRET) as JwtData;
    } catch (error) {
      console.error(comments.REFRESH_INVLD, error);
      throw new Error(comments.REFRESH_INVLD);
    }
  };
}
