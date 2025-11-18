import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { badRequest, ok, serverError } from "./helpers/http.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
    invalidEmailResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    checkIfIdIsValid,
} from "./helpers/user.js";

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;
            const isIdValid = checkIfIdIsValid(userId);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const params = httpRequest.body;
            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];
            const someInvalidField = Object.keys(params).some(
                (key) => !allowedFields.includes(key)
            );
            if (someInvalidField) {
                return badRequest({ message: "Invalid field" });
            }
            if (params.password) {
                if (!checkIfPasswordIsValid(params.password)) {
                    return invalidPasswordResponse();
                }
            }

            if (params.email) {
                if (!checkIfEmailIsValid(params.email)) {
                    return invalidEmailResponse();
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUser = await updateUserUseCase.execute(userId, params);
            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }
}
