import { DeleteUserUseCase } from "../use-cases/index.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    ok,
    serverError,
} from "./helpers/index.js";

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;
            const isIdValid = checkIfIdIsValid(userId);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const deleteUserUseCase = new DeleteUserUseCase();
            const deletedUser = await deleteUserUseCase.execute(userId);

            return ok(deletedUser);
        } catch (error) {
            return serverError();
        }
    }
}
