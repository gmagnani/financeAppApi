import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const result = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return result;
    }
}
