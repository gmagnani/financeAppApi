import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetTransactionsByUserIdRepository {
    async execute(userId) {
        const results = await prisma.transaction.findMany({
            where: {
                userId: userId,
            },
        });
        return results;
    }
}
