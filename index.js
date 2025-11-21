import "dotenv/config.js";
import express from "express";

import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from "./src/controllers/index.js";
import {
    PostgresGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
} from "./src/repositories/postgres/index.js";
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
} from "./src/use-cases/index.js";

const app = express();
app.use(express.json());

app.get("/api/users/:id", async (req, res) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
    const { statusCode, body } = await getUserByIdController.execute(req);
    res.status(statusCode).json(body);
});

app.post("/api/users", async (req, res) => {
    const createUserRepository = new PostgresCreateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserUseCase = new CreateUserUseCase(
        createUserRepository,
        getUserByEmailRepository
    );
    const createUserController = new CreateUserController(createUserUseCase);
    const { statusCode, body } = await createUserController.execute(req);
    res.status(statusCode).json(body);
});

app.patch("/api/users/:id", async (req, res) => {
    const updateUserRepository = new PostgresUpdateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        getUserByEmailRepository
    );
    const updateUserController = new UpdateUserController(updateUserUseCase);
    const { statusCode, body } = await updateUserController.execute(req);
    res.status(statusCode).json(body);
});

app.delete("/api/users/:id", async (req, res) => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);
    const { statusCode, body } = await deleteUserController.execute(req);
    res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
