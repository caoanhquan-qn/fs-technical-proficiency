- Run Database server

```bash
docker run --name postgres-db -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres-db -d postgres:latest
```
