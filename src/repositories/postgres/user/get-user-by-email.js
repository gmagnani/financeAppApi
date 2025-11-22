import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const result = await PostgresHelper.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return result[0];
    }
}
