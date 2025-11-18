import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { notFound, ok, serverError } from "./helpers/http.js";
import { checkIfIdIsValid, invalidIdResponse } from "./helpers/user.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.id);
            if (!isIdValid) {
                return invalidIdResponse();
            }
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
