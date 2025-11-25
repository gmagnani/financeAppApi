import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    serverError,
    checkIfAmountIsValid,
    invalidAmountResponse,
    checkIfTypeIsValid,
    invalidTypeResponse,
    ok,
    notFoundResponse,
} from "../helpers/index.js";

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.id;
            const params = httpRequest.body;
            const isIdValid = checkIfIdIsValid(transactionId);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const allowedFields = ["title", "date", "amount", "type"];
            const someInvalidField = Object.keys(params).some(
                (key) => !allowedFields.includes(key)
            );
            if (someInvalidField) {
                return badRequest({ message: "Invalid field" });
            }
            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount);
                if (!amountIsValid) {
                    return invalidAmountResponse();
                }
            }
            if (params.type) {
                const type = params.type.trim().toLowerCase();
                const typeIsValid = checkIfTypeIsValid(type);
                if (!typeIsValid) {
                    return invalidTypeResponse();
                }
            }
            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params
                );
            return ok(updatedTransaction);
        } catch (error) {
            console.log(error);
            if (error instanceof UserNotFoundError) {
                return notFoundResponse();
            }
            return serverError();
        }
    }
}
