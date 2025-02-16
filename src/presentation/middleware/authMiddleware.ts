import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { JwtData } from "../../core/entities/misc/JwtData";
import { comments } from "../../shared/constants/comments";

export class AuthMiddleware {
  static create(
    jwtService: JwtService,
    getUserDetailsUseCase: GetUserDetailsUseCase
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      const middleware = new AuthMiddleware(
        req,
        res,
        next,
        jwtService,
        getUserDetailsUseCase
      );
      return middleware.authenticateToken();
    };
  }

  private constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
    private jwtService: JwtService,
    private getUserDetailsUseCase: GetUserDetailsUseCase
  ) {}

  private authenticateToken = async () => {
    try {
      const accessToken = this.req.cookies["accessToken"];

      if (!accessToken) {
        return this.res.status(401).json({ message: comments.ACCSS_NOT_FOUND });
      }

      const decoded: JwtData | null =
        this.jwtService.verifyAccessToken(accessToken);

      if (!decoded?._id) {
        return this.res
          .status(401)
          .json({ message: comments.JWT_PAYLOAD_INVLD });
      }

      const { data } = await this.getUserDetailsUseCase.execute(decoded._id);

      if (!data.user) {
        return this.res.status(401).json({ message: comments.USER_NOT_FOUND });
      }

      this.req.user = data.user;
      this.next();
    } catch (error) {
      return this.res.status(401).json({ message: comments.ACCESS_INVLD });
    }
  };
}
