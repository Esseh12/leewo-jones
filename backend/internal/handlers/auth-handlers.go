package handlers

import (
	"errors"
	"log"
	"net/http"

	"github.com/Esseh12/leewo-jones/api/internal/model"
	"github.com/Esseh12/leewo-jones/api/internal/services"
	"github.com/gin-gonic/gin"
)

// ShowAccount godoc
// @Summary get user profile
// @Description returns uer profile
// @Tags Auth
// @Security ApiKeyAuth
// @Produce json
// @Success 200
// @Router /profile [get]
func (h Handler) Profile(ctx *gin.Context) {
	val, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"error": "cannot get user from context",
		})
		return
	}
	user := val.(model.User)
	ctx.JSON(http.StatusOK, gin.H{
		"status":  http.StatusText(http.StatusOK),
		"message": "User profile",
		"data": map[string]model.User{
			"user": user,
		},
	})
}

// ShowAccount godoc
// @Summary login user
// @Description user login using email and passsword
// @Tags Auth
// @Produce json
// @Success 202
// @failure 400
// @Param body body createUserPOSTData true "Request body description"
// @Router /auth/login [post]
func (h Handler) Login(ctx *gin.Context) {
	var data createUserPOSTData
	err := ctx.ShouldBindJSON(&data)
	if err != nil {
		log.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	auth := services.AuthService{
		Store:  h.Storage,
		Config: h.Config,
	}
	loggedInData, err := auth.LoginUser(data.Email, data.Password)
	if err != nil {
		err = errors.Join(errors.New("invalid login details"), err)
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{
		"status":  http.StatusText(http.StatusAccepted),
		"message": "User logged-in successfully!",
		"data":    loggedInData,
	})

}

// ShowAccount godoc
// @Summary register user
// @Description signup user using email and passsword
// @Tags Auth
// @Produce json
// @Success 201
// @failure 400
// @Param body body createUserPOSTData true "data for signup"
// @Router /auth/signup [post]
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
