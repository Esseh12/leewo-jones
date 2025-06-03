

.PHONY: migrations swag

build:
	GOOS=linux GOARCH=amd64 go build -o bin/leewo cmd/main.go

run: swag
	go run cmd/main.go

migrations:
	goose -dir migrations create -s $(NAME) sql

migrateup:
	goose -dir migrations sqlite3 leewo.db up

migratestatus:
	goose -dir migrations sqlite3 leewo.db status

swag:
	swag init -g cmd/main.go --dir . --parseDependency --output ./docs
	
