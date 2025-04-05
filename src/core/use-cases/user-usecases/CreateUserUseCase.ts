import { comments } from "../../../shared/constants/comments";
import hashPassword from "../../../shared/utils/hashPassword";
import { IUser } from "../../entities/IUser";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

class CreateUserUseCase {
  constructor(private userRepository: UserInterface) {}

  // input: user data
  // ouput: creates new user.
  async execute(userData: IUser): Promise<UseCaseResponse> {
    try {
      const existingUser = await this.userRepository.findByEmail(
        userData.email as string
      );

      if (existingUser) {
        throw new Error(comments.EMAIL_TAKEN);
      }

      let newUser: IUser;
      if (userData.password) {
        const hashedPassword = (
          await hashPassword(userData.password as string)
        ).toString();

        newUser = await this.userRepository.add({
          ...userData,
          password: hashedPassword,
        });
      }
      newUser = await this.userRepository.add(userData);
      return { success: true, data: newUser };
    } catch (error) {
      console.log(comments.USER_CREATE_UC_FAIL, error);
      return {
        success: false,
        message: comments.USER_CREATE_UC_FAIL,
        err: error,
      };
    }
  }
}

export default CreateUserUseCase;
