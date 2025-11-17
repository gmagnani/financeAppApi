import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";
import { badRequest, created, serverError } from "./helpers.js";

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Missing or empty field: ${field}`,
                    });
                }
            }

            if (params.password.length < 6) {
                return badRequest({
                    message: "Password must be at least 6 characters long",
                });
            }

            if (!validator.isEmail(params.email)) {
                return badRequest({ message: "Invalid email format" });
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);
            return created(createdUser);
        } catch (error) {
            return serverError();
        }
    }
}
