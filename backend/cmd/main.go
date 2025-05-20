package main

import (
	"github.com/Esseh12/leewo-jones/api/internal/router"
)

func main() {
	server := router.New("localhost", "5000")
	server.RegisterRoutes()
	server.Start()
}
