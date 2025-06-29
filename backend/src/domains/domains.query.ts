export const GET_ALL_DOMAINS_BY_USER_ID_QUERY = `SELECT * FROM domains WHERE created_by = $1 ORDER BY created_at DESC`;
