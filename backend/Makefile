

.PHONY: migrations

run:
	go run cmd/main.go

migrations:
	goose -dir migrations create -s $(NAME) sql

migrateup:
	goose -dir migrations sqlite3 leewo.db up

migratestatus:
	goose -dir migrations sqlite3 leewo.db status

