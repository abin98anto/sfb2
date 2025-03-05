import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import hashPassword from "../../../shared/utils/hashPassword";
import { IUser } from "../../entities/IUser";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import bcrypt from "bcryptjs";

export interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
}

class ChangePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  execute = async (
    user: IUser,
    data: ChangePasswordProps
  ): Promise<UseCaseResponse> => {
    try {
      const isMatch = await bcrypt.compare(
        data.currentPassword,
        user.password as string
      );
      if (!isMatch) {
        return {
          success: false,
          message: "Current password is incorrect.",
        };
      }

      const newHashedPassword = await hashPassword(data.newPassword);

      await this.userRepository.update(user._id as string, {
        password: newHashedPassword,
      });

      return {
        success: true,
        message: "Password changed successfully.",
      };
    } catch (error) {
      console.log("error changing password", error);
      return {
        success: false,
        message: "error changing password",
        err: error,
      };
    }
  };
}

export default ChangePasswordUseCase;
