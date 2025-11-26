import { badRequest } from "./http.js";

export const invalidPasswordResponse = () => {
    return badRequest({
        message: "Password must be at least 6 characters long",
    });
};

export const emailAlreadyInUseResponse = () => {
    return badRequest({ message: "Email already in use" });
};

export const notFoundResponse = () => {
    return badRequest({ message: "User not found" });
};


