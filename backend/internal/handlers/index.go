package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Index(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"message": "welcome home",
	})
}

func Health(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"health": "OK",
	})
}
