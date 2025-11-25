import { badRequest } from "../helpers/index.js";
import validator from "validator";

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount !== "number") {
        return false;
    }
    return validator.isCurrency(amount.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
    });
};

export const checkIfTypeIsValid = (type) => {
    const validTypes = ["income", "expense", "investment"];
    return validTypes.includes(type);
};

export const invalidAmountResponse = () => {
    return badRequest({ message: "Amount must be a valid currency format" });
};

export const invalidTypeResponse = () => {
    return badRequest({ message: "Invalid type" });
};

export const transactionNotFoundResponse = () => {
    return badRequest({ message: "Transaction not found" });
};
