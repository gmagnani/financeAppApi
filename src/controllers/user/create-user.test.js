import { CreateUserController } from "../index.js";

describe("Create User Controller", () => {
    it("should create a new user successfully", async () => {
        class CreateUserUseCaseStub {
            execute(user) {
                return user;
            }
        }
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
});
