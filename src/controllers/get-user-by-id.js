import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, notFound, ok, serverError } from "./helpers.js";
import validator from "validator";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.id);
            if (!isIdValid) {
                return badRequest({ message: "User id is not valid" });
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
