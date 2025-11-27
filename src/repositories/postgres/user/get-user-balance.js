import { Prisma } from "@prisma/client/extension";
import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transaction.aggregate({
            where: {
                userId: userId,
                type: "EXPENSE",
            },
            _sum: {
                amount: true,
            },
        });
        const {
            _sum: { amount: totalIncomes },
        } = await prisma.transaction.aggregate({
            where: {
                userId: userId,
                type: "INCOME",
            },
            _sum: {
                amount: true,
            },
        });
        const {
            _sum: { amount: totalInvestments },
        } = await prisma.transaction.aggregate({
            where: {
                userId: userId,
                type: "INVESTMENT",
            },
            _sum: {
                amount: true,
            },
        });
        const _totalExpenses = totalExpenses || new Prisma.Decimal(0);
        const _totalIncomes = totalIncomes || new Prisma.Decimal(0);
        const _totalInvestments = totalInvestments || new Prisma.Decimal(0);
        const balance = _totalIncomes - _totalExpenses - _totalInvestments;
        return {
            totalExpenses: _totalExpenses,
            totalIncomes: _totalIncomes,
            totalInvestments: _totalInvestments,
            balance: new Prisma.Decimal(balance),
        };
    }
}
