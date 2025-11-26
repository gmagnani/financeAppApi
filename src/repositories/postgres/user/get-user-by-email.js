import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const result = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return result;
    }
}
