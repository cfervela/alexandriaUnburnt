SCHEMA_FILE := sql/schemas/products.sql

.PHONY: import-schema

import-schema:
	docker compose exec -T mariadb sh -lc 'mariadb -u root -p"$$MARIADB_ROOT_PASSWORD" "$$MARIADB_DATABASE"' < $(SCHEMA_FILE)
