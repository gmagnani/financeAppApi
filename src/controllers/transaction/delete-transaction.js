import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFoundResponse,
    ok,
    serverError,
} from "../helpers/index.js";

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.id;
            const isIdValid = checkIfIdIsValid(transactionId);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const deletedTransaction =
                await this.deleteUserUseCase.execute(transactionId);
            if (!deletedTransaction) {
                return notFoundResponse();
            }

            return ok(deletedTransaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
