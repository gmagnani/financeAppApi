CREATE OR REPLACE FUNCTION get_user_balance(uid UUID)
RETURNS TABLE (
    incomes NUMERIC(10, 2),
    expenses NUMERIC(10, 2),
    investments NUMERIC(10, 2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS incomes,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expenses,
        SUM(CASE WHEN type = 'investment' THEN amount ELSE 0 END) AS investments,
        (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) -
            SUM(CASE WHEN type = 'investment' THEN amount ELSE 0 END)
        ) AS balance
    FROM transactions 
    WHERE user_id = get_uer_balance.uid;
END; $$ 
    LANGUAGE plpgsql;

