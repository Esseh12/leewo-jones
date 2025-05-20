package router

import (
	"fmt"
	"log"

	"github.com/Esseh12/leewo-jones/api/internal/handlers"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Address string
	route   *gin.Engine
}

func New(host, port string) *Server {
	r := gin.Default()
	return &Server{
		Address: fmt.Sprintf("%s:%s", host, port),
		route:   r,
	}
}

func (s *Server) RegisterRoutes() {
	r := s.route.Group("/api/v1")
	{
		r.GET("/", handlers.Index)
		r.GET("/health", handlers.Health)
	}

}

func (s *Server) Start() error {
	if err := s.route.Run(s.Address); err != nil {
		log.Println("error starting the server: ", err)
		return err
	}
	return nil
}
