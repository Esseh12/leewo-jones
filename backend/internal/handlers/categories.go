package handlers

import (
	"net/http"
	"strings"

	// services "github.com/Esseh12/leewo-jones/api/internal/service"
	"github.com/Esseh12/leewo-jones/api/internal/services"
	"github.com/gin-gonic/gin"
)

// ShowAccount godoc
// @Summary get category detail
// @Description returns info about a specified category
// @Tags Categories
// @Produce json
// @Success 200
// @Param name path string true "category name"
// @Router /categories/{name} [get]
func (h Handler) CategoryDetail(ctx *gin.Context) {
	name := ctx.Param("name")
	name = strings.ToLower(name)

	PhotoService := services.PhotoService{}
	data := PhotoService.GetPhotosByCategoryName(name, h.Storage)

	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   data,
	})

}
