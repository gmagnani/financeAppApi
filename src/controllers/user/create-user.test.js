import { it } from "node:test";
import { CreateUserController } from "../index.js";

describe("Create User Controller", () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    it("should create a new user successfully", async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase
        );
        const httpRequest = {
            body: {
                first_name: "John",
                last_name: "Doe",
                email: "testuser@example.com",
                password: "password123",
            },
        };

        // Act
        const result = await createUserController.execute(httpRequest);

        // Assert
        expect(result.statusCode).toBe(201);
        expect(result.body).not.toBeNull();
        expect(result.body).not.toBeUndefined();
    });

    it("should return 400 if first_name is missing", async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase
        );
        const httpRequest = {
            body: {
                last_name: "Doe",
                email: "testuser@example.com",
                password: "password123",
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);
        // Assert
        expect(result.statusCode).toBe(400);
    });
});
