import { z } from "zod";
import validator from "validator";

export const createTransactionSchema = z.object({
    user_id: z.uuid(),
    title: z
        .string({
            required_error: "Title is required",
        })
        .trim()
        .min(1, {
            message: "Title is required",
        }),
    date: z.date({
        required_error: "Date is required",
    }),
    amount: z
        .number({
            required_error: "Amount is required",
        })
        .min(1, {
            message: "Amount must be greater than 0",
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: ".",
            })
        ),
    type: z.enum(["income", "expense", "investment"]),
});

export const updateTransactionSchema = createTransactionSchema
    .partial()
    .strict({
        message: "Some invalid field(s) were provided",
    });
