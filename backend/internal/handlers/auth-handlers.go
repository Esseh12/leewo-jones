package handlers

import (
	"log"
	"net/http"

	"github.com/Esseh12/leewo-jones/api/internal/services"
	"github.com/gin-gonic/gin"
)

func (h Handler) Signup(ctx *gin.Context) {
	var data createUserPOSTData

	// bind and validate request data
	if err := ctx.ShouldBindJSON(&data); err != nil {
		log.Printf("%+v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	auth := services.AuthService{
		Store: h.Storage,
	}

	user, err := auth.RegisterUser(data.Email, data.Password)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// name := ctx.Param("name")
	// name = strings.ToLower(name)

	// PhotoService := services.PhotoService{}
	// data := PhotoService.GetPhotosByCategoryName(name, h.Storage)

	ctx.JSON(http.StatusOK, gin.H{
		"status":  http.StatusText(http.StatusCreated),
		"message": "User registration successful!",
		"data": map[string]any{
			"user": user,
		},
	})
}
