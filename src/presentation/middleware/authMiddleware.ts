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
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        // const accessToken = req.cookies["accessToken"];

        // if (!accessToken) {
        //   res.status(401).json({ message: comments.ACCSS_NOT_FOUND });
        //   return;
        // }

        // const decoded: JwtData | null =
        //   jwtService.verifyAccessToken(accessToken);

        // if (!decoded?._id) {
        //   res.status(401).json({ message: comments.JWT_PAYLOAD_INVLD });
        //   return;
        // }

        // const { data } = await getUserDetailsUseCase.execute(
        //   decoded?._id as string
        // );

        // if (!data) {
        //   res.status(401).json({ message: comments.USER_NOT_FOUND });
        //   return;
        // }

        // if (!data.isActive) {
        //   res.status(401).json({ message: "user is blocked by admin" });
        //   return;
        // }
        // req.user = data;
        next();
      } catch (error) {
        res.status(401).json({ message: comments.ACCESS_INVLD });
      }
    };
  }
}
