import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
    checkIfAmountIsValid,
    invalidAmountResponse,
    checkIfTypeIsValid,
    invalidTypeResponse,
} from "../helpers/index.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const requiredFields = [
                "user_id",
                "title",
                "date",
                "amount",
                "type",
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

            const userIdIsValid = checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);

            if (!amountIsValid) {
                return invalidAmountResponse();
            }
            const type = params.type.trim().toLowerCase();

            const typeIsValid = checkIfTypeIsValid(type);
            if (!typeIsValid) {
                return invalidTypeResponse();
            }

            const createdTransaction =
                await this.createTransactionUseCase.execute(...params, type);
            return created(createdTransaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
