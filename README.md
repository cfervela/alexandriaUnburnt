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

## How to test the production build before deploying

Before publishing to GitHub Pages, you can validate the final `dist` locally:

1. Build the frontend for Pages:

```bash
cd alexandriaUnburnt
npm run build:pages
```

2. Prepare the local preview folder in the project root:

```bash
npm run preview:pages
```

This will give you the port you need to use.

3. Open the app in the browser:

```text
http://localhost:8081/alexandriaUnburnt/
```

Check if that's the correct port.

## Important note about volumes

The database uses persistent data in a volume (mapped to the `mariadb/` folder).
If you make important changes and want to start from scratch, stop the containers and clean persisted data before starting again:

```bash
docker compose down
rm -rf mariadb
docker compose up -d
make import-schema
```
