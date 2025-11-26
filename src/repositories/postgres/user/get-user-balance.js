import { prisma } from "../../../../prisma/prisma.js";
import { PostgresHelper } from "../../../db/postgres/helper.js";

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
        const _totalExpenses = totalExpenses || 0;
        const _totalIncomes = totalIncomes || 0;
        const _totalInvestments = totalInvestments || 0;
        const balance = _totalIncomes - _totalExpenses - _totalInvestments;
        return {
            totalExpenses: _totalExpenses,
            totalIncomes: _totalIncomes,
            totalInvestments: _totalInvestments,
            balance: balance,
        };
    }
}
