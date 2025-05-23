package main

import (
	"github.com/Esseh12/leewo-jones/api/internal/config"
	"github.com/Esseh12/leewo-jones/api/internal/db"
	"github.com/Esseh12/leewo-jones/api/internal/server"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.New()
	r := gin.Default()

	store := db.SQLiteStore{
		DB: db.InitDB(),
	}
	defer store.DB.Close()

	db.RunMigrations(store.DB)

	server := server.New(cfg, r, store)
	server.RegisterRoutes()
	server.Start()
}
