import { GetUserByIdUseCase } from "../use-cases/index.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    notFoundResponse,
    ok,
    serverError,
} from "./helpers/index.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.id);
            if (!isIdValid) {
                return invalidIdResponse();
            }
            const userId = httpRequest.params.id;
            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(userId);
            if (!user) {
                return notFoundResponse();
            }
            return ok(user);
        } catch (error) {
            return serverError();
        }
    }
}
