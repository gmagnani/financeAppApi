import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
} from "../repositories/postgres/index.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const existingUser = await postgresGetUserByEmailRepository.execute(
            createUserParams.email
        );

        if (existingUser) {
            throw new EmailAlreadyInUseError();
        }

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
