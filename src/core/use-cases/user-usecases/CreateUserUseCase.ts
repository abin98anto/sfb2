import hashPassword from "../../../shared/utils/hashPassword";
import { IUser } from "../../entities/IUser";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

class CreateUserUseCase {
  constructor(private userRepository: UserInterface) {}

  async execute(userData: IUser): Promise<UseCaseResponse> {
    try {
      const existingUser = await this.userRepository.findByEmail(
        userData.email as string
      );

      if (existingUser) {
        throw new Error("Email is taken");
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
      console.log("error in creating user", error);
      return {
        success: false,
        message: "error creating user in controller",
        err: error,
      };
    }
  }
}

export default CreateUserUseCase;
