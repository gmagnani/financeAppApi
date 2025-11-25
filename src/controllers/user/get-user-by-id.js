import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFoundResponse,
    ok,
    serverError,
} from "../helpers/index.js";

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.id);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const userId = httpRequest.params.id;
            const user = await this.getUserByIdUseCase.execute(userId);
            if (!user) {
                return notFoundResponse();
            }
            return ok(user);
        } catch (error) {
            return serverError();
        }
    }
}
