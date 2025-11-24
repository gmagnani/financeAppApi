import { badRequest } from "./http.js";
import validator from "validator";

export const invalidPasswordResponse = () => {
    return badRequest({
        message: "Password must be at least 6 characters long",
    });
};

export const emailAlreadyInUseResponse = () => {
    return badRequest({ message: "Email already in use" });
};

export const invalidEmailResponse = () => {
    return badRequest({ message: "Invalid email format" });
};



export const notFoundResponse = () => {
    return badRequest({ message: "User not found" });
};

export const checkIfEmailIsValid = (email) => {
    return validator.isEmail(email);
};

export const checkIfPasswordIsValid = (password) => {
    return password.length >= 6;
};

