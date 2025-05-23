package handlers

import (
	"github.com/Esseh12/leewo-jones/api/internal/config"
	"github.com/Esseh12/leewo-jones/api/internal/model"
)

type Handler struct {
	Storage model.Store
	Config  *config.Config
}

func NewHandler(storage model.Store, config *config.Config) Handler {
	return Handler{
		Storage: storage,
		Config:  config,
	}
}
