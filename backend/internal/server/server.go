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

	r := s.Router.Group("/api/v1")
	{
		r.GET("/", h.Index)
		r.GET("/health", h.Health)

		rc := r.Group("/categories")
		rc.GET("/:name", h.CategoryDetail)
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
