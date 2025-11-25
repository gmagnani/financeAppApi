import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        const fields = [];
        const values = [];
        Object.keys(updateTransactionParams).forEach((key) => {
            fields.push(`${key} = $${values.length + 1}`);
            values.push(updateTransactionParams[key]);
        });
        values.push(transactionId);
        const updateQuery = `UPDATE transactions SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING *;`;
        const updatedTransaction = await PostgresHelper.query(
            updateQuery,
            values
        );
        return updatedTransaction[0];
    }
}
