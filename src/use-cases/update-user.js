import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository();

            const existingUser = await postgresGetUserByEmailRepository.execute(
                updateUserParams.email
            );

            if (existingUser) {
                throw new EmailAlreadyInUseError();
            }
        }

        const user = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10
            );
            user.password = hashedPassword;
        }

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user
        );
        return updatedUser;
    }
}
