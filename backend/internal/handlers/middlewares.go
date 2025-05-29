package handlers

import (
	"net/http"
	"strings"

	"github.com/Esseh12/leewo-jones/api/internal/model"
	"github.com/Esseh12/leewo-jones/api/pkg/jwt"
	"github.com/gin-gonic/gin"
)

func (h Handler) Authenticate(ctx *gin.Context) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing or invalid Authorization header"})
		return
	}
	tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
	claims, err := jwt.ValidateJWT(tokenStr, h.Config.JWT_SECRET)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	var user model.User
	h.Storage.GetUserById(&user, claims.UserID)

	ctx.Set("user", user)
	ctx.Next()
}
