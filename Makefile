SCHEMA_FILE := sql/schemas/products.sql
MESSAGES_SCHEMA_FILE := sql/schemas/mensajes.sql

.PHONY: import-schema import-messages

import-schemas:
	docker compose exec -T mariadb sh -lc 'mariadb -u root -p"$$MARIADB_ROOT_PASSWORD" "$$MARIADB_DATABASE"' < $(SCHEMA_FILE)
	docker compose exec -T mariadb sh -lc 'mariadb -u root -p"$$MARIADB_ROOT_PASSWORD" "$$MARIADB_DATABASE"' < $(MESSAGES_SCHEMA_FILE)
