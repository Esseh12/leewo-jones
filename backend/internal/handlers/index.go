package handlers

import (
	"net/http"

	"github.com/Esseh12/leewo-jones/api/internal/services"
	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// PingExample godoc
// @Summary ping example
// @Schemes
// @Description do ping
// @Tags example
// @Produce json
// @Success 200 {string} Helloworld
// @Router / [get]
func (h Handler) Index(ctx *gin.Context) {
	PhotoService := services.PhotoService{}
	const numberOfNewArrivals = 2

	featured := PhotoService.GetFeaturedPhotos(h.Storage)
	newArrivals := PhotoService.GetNewArrivals(numberOfNewArrivals, h.Storage)

	ctx.JSON(http.StatusOK, gin.H{
		"status":  http.StatusText(http.StatusOK),
		"message": "success",
		"data": map[string]any{
			"featured":     featured,
			"new-arrivals": newArrivals,
		},
	})
}

func (h Handler) Health(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"health": "OK",
	})
}
