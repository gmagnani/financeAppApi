import { EmailAlreadyInUseError } from "../../errors/user.js";
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
} from "../helpers/index.js";
export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            const requiredFieldsValidation = validateRequiredFields(
                params,
                requiredFields
            );
            if (!requiredFieldsValidation.ok) {
                return badRequest({
                    message: `Missing or empty field: ${requiredFieldsValidation.missingField}`,
                });
            }

            if (!checkIfPasswordIsValid(params.password)) {
                return invalidPasswordResponse();
            }

            if (!checkIfEmailIsValid(params.email)) {
                return invalidEmailResponse();
            }
            const createdUser = await this.createUserUseCase.execute(params);
            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }
}
