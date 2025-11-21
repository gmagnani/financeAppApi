import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFoundResponse,
    ok,
    serverError,
} from "./helpers/index.js";

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;
            const isIdValid = checkIfIdIsValid(userId);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const deletedUser = await this.deleteUserUseCase.execute(userId);
            if (!deletedUser) {
                return notFoundResponse();
            }

            return ok(deletedUser);
        } catch (error) {
            return serverError();
        }
    }
}
