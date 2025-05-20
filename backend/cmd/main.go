package main

import (
	"github.com/Esseh12/leewo-jones/api/internal/config"
	"github.com/Esseh12/leewo-jones/api/internal/router"
)

var cfg *config.Config

func init() {
	cfg = config.New()
}

func main() {
	server := router.New(cfg.Host, cfg.Port)
	server.RegisterRoutes()
	server.Start()
}
