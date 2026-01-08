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

    it("should return 400 if last_name is missing", async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase
        );
        const httpRequest = {
            body: {
                first_name: "John",
                email: "testuser@example.com",
                password: "password123",
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);
        // Assert
        expect(result.statusCode).toBe(400);
    });

    it("should return 400 if email is missing", async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase
        );
        const httpRequest = {
            body: {
                first_name: "John",
                last_name: "Doe",
                password: "password 123",
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);
        // Assert
        expect(result.statusCode).toBe(400);
    });

    it("should return 400 if password is missing", async () => {
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
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);
        // Assert
        expect(result.statusCode).toBe(400);
    }); 

});
