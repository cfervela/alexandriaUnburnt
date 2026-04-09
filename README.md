# Alexandria Unburnt

## How to run the project

1. Start the containers:

```bash
docker compose up -d
```

2. If this is the first time you start the containers, import the products schema:

```bash
make import-schema
```

This runs the SQL from `sql/schemas/products.sql` inside the MariaDB container.

3. Start the frontend manually:

```bash
cd alexandriaUnburnt
npm start
```

4. In another terminal, start the backend:

```bash
cd backend
npm run dev
```

## Important note about volumes

The database uses persistent data in a volume (mapped to the `mariadb/` folder).
If you make important changes and want to start from scratch, stop the containers and clean persisted data before starting again:

```bash
docker compose down
rm -rf mariadb
docker compose up -d
make import-schema
```
