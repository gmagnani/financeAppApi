import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            const deletedUser = await prisma.user.deleteMany({
                where: {
                    id: userId,
                },
            });
            return deletedUser;
        } catch (error) {
            return null;
        }
    }
}
