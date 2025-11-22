import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserUseCase {
    constructor(createUserRepository, getUserByEmailRepository) {
        this.createUserRepository = createUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }

    async execute(createUserParams) {
        const existingUser = await this.getUserByEmailRepository.execute(
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

        const createdUser = await this.createUserRepository.execute(newUser);
        return createdUser;
    }
}
