import {
    badRequest,
    serverError,
    ok,
    notFoundResponse,
} from "../helpers/index.js";
import { ZodError } from "zod";
import { updateTransactionSchema } from "../../schemas/index.js";

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.id;
            const params = httpRequest.body;
            await updateTransactionSchema.parseAsync(params);
            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params
                );
            return ok(updatedTransaction);
        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                return badRequest({ message: error.issues[0].message });
            }
            if (error instanceof UserNotFoundError) {
                return notFoundResponse();
            }
            return serverError();
        }
    }
}
