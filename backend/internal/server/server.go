package server

import (
	"fmt"
	"log"

	"github.com/Esseh12/leewo-jones/api/internal/config"
	"github.com/Esseh12/leewo-jones/api/internal/handlers"
	"github.com/Esseh12/leewo-jones/api/internal/model"
	"github.com/gin-gonic/gin"
)

type Server struct {
	// Address string
	Router  *gin.Engine
	Storage model.Store
	Config  *config.Config
}

func New(config *config.Config, router *gin.Engine, storage model.Store) *Server {
	// r := gin.Default()
	return &Server{
		Router:  router,
		Storage: storage,
		Config:  config,
		// Address: fmt.Sprintf("%s:%s", host, port),
		// route:   r,
	}
}

func (s *Server) RegisterRoutes() {

	h := handlers.NewHandler(s.Storage, s.Config)

	routes := s.Router.Group("/api/v1")
	{
		routes.GET("/", h.Index)
		routes.GET("/health", h.Health)

		categoryRoutes := routes.Group("/categories")
		categoryRoutes.GET("/:name", h.CategoryDetail)
	}

	authRoutes := routes.Group("/auth")
	{
		authRoutes.POST("/signup", h.Signup)
	}

}

func (s *Server) Start() error {
	address := fmt.Sprintf("%s:%s", s.Config.Host, s.Config.Port)
	if err := s.Router.Run(address); err != nil {
		log.Println("error starting the server: ", err)
		return err
	}
	return nil
}
