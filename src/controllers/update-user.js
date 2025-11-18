import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { badRequest, ok, serverError } from "./helpers.js";
import validator from "validator";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;
            const isIdValid = validator.isUUID(userId);
            if (!isIdValid) {
                return badRequest({ message: "User id is not valid" });
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
                if (params.password.length < 6) {
                    return badRequest({
                        message: "Password must be at least 6 characters long",
                    });
                }
            }

            if (params.email) {
                if (!validator.isEmail(params.email)) {
                    return badRequest({ message: "Invalid email format" });
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
