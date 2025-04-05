import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { comments } from "../../../shared/constants/comments";
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

  // intput: user id, current password, new password
  // output: updates user password.
  execute = async (
    user: Partial<IUser>,
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
          message: comments.INCORRECT_PASSWORD,
        };
      }

      const newHashedPassword = await hashPassword(data.newPassword);

      await this.userRepository.update(user._id as string, {
        password: newHashedPassword,
      });

      return {
        success: true,
        message: comments.PASS_CHANGE_SUCC,
      };
    } catch (error) {
      console.log(comments.PASS_CHANGE_UC_FAIL, error);
      return {
        success: false,
        message: comments.PASS_CHANGE_UC_FAIL,
        err: error,
      };
    }
  };
}

export default ChangePasswordUseCase;
