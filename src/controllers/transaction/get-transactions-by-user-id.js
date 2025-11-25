import { UserNotFoundError } from "../../errors/user.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFoundResponse,
    ok,
    serverError,
    badRequest,
} from "../helpers/index.js";

export class GetTransactionsByUserIdController {
    constructor(geTransactionsByUserIdUseCase) {
        this.geTransactionsByUserIdUseCase = geTransactionsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;
            if (!userId) {
                return badRequest({
                    message: "Missing userId query parameter",
                });
            }
            const isIdValid = checkIfIdIsValid(userId);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const transactions =
                await this.geTransactionsByUserIdUseCase.execute({ userId });
            return ok(transactions);
        } catch (error) {
            console.log(error);
            if (error instanceof UserNotFoundError) {
                return notFoundResponse();
            }
            return serverError();
        }
    }
}
