import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const userId = uuidv4();

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const newUser = {
            id: userId,
            first_name: createUserParams.first_name,
            last_name: createUserParams.last_name,
            email: createUserParams.email,
            password: hashedPassword,
        };

        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(newUser);
        return createdUser;
    }
}
