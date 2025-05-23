package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h Handler) Index(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"message": "welcome home",
	})
}

func (h Handler) Health(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"health": "OK",
	})
}
