import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const fields = [];
        const values = [];
        Object.keys(updateUserParams).forEach((key) => {
            fields.push(`${key} = $${values.length + 1}`);
            values.push(updateUserParams[key]);
        });
        values.push(userId);
        const updateQuery = `UPDATE users SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING *;`;
        const updatedUser = await PostgresHelper.query(updateQuery, values);
        return updatedUser[0];
    }
}
