package main

import (
	docs "github.com/Esseh12/leewo-jones/api/docs"
	"github.com/Esseh12/leewo-jones/api/internal/config"
	"github.com/Esseh12/leewo-jones/api/internal/db"
	"github.com/Esseh12/leewo-jones/api/internal/server"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.New()
	r := gin.Default()

	docs.SwaggerInfo.BasePath = "/api/v1"

	store := db.SQLiteStore{
		DB: db.InitDB(),
	}
	defer store.DB.Close()

	db.RunMigrations(store.DB)

	server := server.New(cfg, r, store)
	server.RegisterRoutes()

	server.Start()
}
