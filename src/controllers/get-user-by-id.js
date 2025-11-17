import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { notFound, ok, serverError } from "./helpers.js";

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.id;
      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);
      if (!user) {
        return notFound({ message: "User not found" });
      }
      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
