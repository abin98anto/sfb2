import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { JwtData } from "../../core/entities/misc/JwtData";
import { comments } from "../../shared/constants/comments";
import { UserRole } from "../../core/entities/misc/enums";

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
        console.log("authenticating", req.cookies);
        const accessToken = req.cookies["accessToken"];
        console.log("access token", accessToken);
        if (!accessToken) {
          res.status(401).json({ message: comments.ACCSS_NOT_FOUND });
          return;
        }

        const decoded: JwtData | null =
          jwtService.verifyAccessToken(accessToken);
        console.log("decoded", decoded);
        if (!decoded?._id) {
          res.status(401).json({ message: comments.JWT_PAYLOAD_INVLD });
          return;
        }

        const { data } = await getUserDetailsUseCase.execute(
          decoded?._id as string
        );
        console.log("the user data ", data);
        if (!data) {
          res.status(401).json({ message: comments.USER_NOT_FOUND });
          return;
        }

        if (!data.isActive) {
          console.log("user not active ", data.isActive);
          res.status(401).json({ message: "user is blocked by admin" });
          return;
        }
        console.log("user active", data.isActive);

        req.user = data;
        console.log("authenticating done");
        next();
      } catch (error) {
        res.status(401).json({ message: comments.ACCESS_INVLD });
      }
    };
  }

  static authorize(allowedRoles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      console.log("authorize");
      if (!req.user) {
        console.log("no user");
        res.status(401).json({ message: comments.ACCESS_INVLD });
        return;
      }

      const userRole = req.user.role as UserRole;
      console.log("uesrrole", userRole);

      if (!allowedRoles.includes(userRole)) {
        console.log("not allowed");
        res
          .status(403)
          .json({ message: "Access forbidden: Insufficient permissions" });
        return;
      }

      console.log("authorizing done");
      next();
    };
  }
}
