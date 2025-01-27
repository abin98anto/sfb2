import { JwtData } from "../../entities/misc/JwtData";

export interface JwtInterface {
  generateAccessToken(data: JwtData): string;
  generateRefreshToken(data: JwtData): string;
  verifyAccessToken(token: string): JwtData | null;
  verifyRefreshToken(token: string): JwtData | null;
}
