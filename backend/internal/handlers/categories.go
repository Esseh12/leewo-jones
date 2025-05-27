package handlers

import (
	"net/http"
	"strings"

	// services "github.com/Esseh12/leewo-jones/api/internal/service"
	"github.com/Esseh12/leewo-jones/api/internal/services"
	"github.com/gin-gonic/gin"
)

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
