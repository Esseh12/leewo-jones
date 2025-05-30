package handlers

import (
	"net/http"

	"github.com/Esseh12/leewo-jones/api/internal/services"
	"github.com/gin-gonic/gin"
)

// PingExample godoc
// @Summary index page
// @Schemes
// @Description shows data for the index page
// @Tags Index
// @Produce json
// @Success 200
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

// ShowAccount godoc
// @Summary      health checker
// @Description  checks if server is running
// @Tags         Index
// @Produce      json
// @Success      200
// @Failure      500
// @Router       /health [get]
func (h Handler) Health(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"health": "OK",
	})
}
