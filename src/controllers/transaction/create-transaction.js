import { serverError } from "../helpers/http.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    created,
} from "../helpers/user.js";
import validator from "validator";

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

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Missing or empty field: ${field}`,
                    });
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: "Amount must be greater than zero",
                });
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: ".",
                }
            );

            if (!amountIsValid) {
                return badRequest({
                    message: "Amount must be a valid currency format",
                });
            }
            const type = params.type.trim().toLowerCase();

            const typeIsValid = ["income", "expense", "investment"].includes(
                type
            );
            if (!typeIsValid) {
                return badRequest({
                    message: "Invalid type",
                });
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
