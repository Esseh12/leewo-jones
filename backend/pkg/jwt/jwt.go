package jwt

import (
	"fmt"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// var jwtKey = []byte()

// CustomClaims embeds RegisteredClaims and adds your custom fields
type CustomClaims struct {
	UserID string `json:"user-id"`
	jwt.RegisteredClaims
}

func GenerateJWTString(user_id, jwtSecretKey string) (string, error) {
	jwtKey := []byte(jwtSecretKey)
	claims := CustomClaims{
		UserID: user_id,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
			Issuer:    "leewo app",
			Subject:   "user_auth",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func ValidateJWT(tokenString, jwtSecretKey string) (*CustomClaims, error) {
	jwtKey := []byte(jwtSecretKey)
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		log.Println("error parsingwithclaims:", err)
		return nil, err
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		log.Println("error checking if token is valid:", err)
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}

// func main() {
// 	tokenString, err := generateJWT("johndoe")
// 	if err != nil {
// 		panic(err)
// 	}

// 	fmt.Println("JWT:", tokenString)

// 	claims, err := validateJWT(tokenString)
// 	if err != nil {
// 		fmt.Println("Invalid token:", err)
// 		return
// 	}

// 	fmt.Println("Authenticated user:", claims.Username)
// 	fmt.Println("Token issued by:", claims.Issuer)
// }
