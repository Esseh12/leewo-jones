package services

import (
	"log"

	"github.com/Esseh12/leewo-jones/api/internal/config"
	"github.com/Esseh12/leewo-jones/api/internal/model"
	"github.com/Esseh12/leewo-jones/api/pkg/jwt"
	"github.com/Esseh12/leewo-jones/api/pkg/utils"
)

type AuthService struct {
	Store  model.Store
	Config *config.Config
}

type LoggedInData struct {
	User   *model.User       `json:"user"`
	Tokens map[string]string `json:"tokens"`
}

func (a AuthService) LoginUser(email, password string) (*LoggedInData, error) {

	// var user model.User

	// hashed, err := utils.HashPassword(password)
	// if err != nil {
	// 	log.Println("error hashing pasword", err)
	// 	return nil, err
	// }

	user, err := a.Store.SigninUser(email, password)
	if err != nil {
		log.Println("error signing in user", err)
		return nil, err
	}

	// jwt stuff
	// generate jwt string
	tokenStr, err := jwt.GenerateJWTString(user.Id, a.Config.JWT_SECRET)
	if err != nil {
		log.Println("Could not create token", err)
		return nil, err
	}

	// Generate JWT

	return &LoggedInData{
		User: user,
		Tokens: map[string]string{
			"access":  tokenStr,
			"refresh": "some refresh token",
		},
	}, nil

	// ctx.JSON(http.StatusAccepted, gin.H{
	// 	"status":  http.StatusText(http.StatusAccepted),
	// 	"message": "User logged-in successfully!",
	// 	"data": map[string]any{
	// 		"user": loggedInUser,
	// 		"tokens": map[string]string{
	// 			"access":  "some jwt access token",
	// 			"refresh": "sone refresh token",
	// 		},
	// 	},
	// })
}

func (a AuthService) RegisterUser(email, password string) (*model.User, error) {

	var user model.User

	hashed, err := utils.HashPassword(password)
	if err != nil {
		log.Println("error hashing pasword", err)
		return nil, err
	}

	id, err := a.Store.CreateUser(email, hashed)
	if err != nil {
		log.Println("error creating user", err)
		return nil, err
	}

	err = a.Store.GetUserById(&user, id)
	if err != nil {
		log.Println("error getting user", err)
		return nil, err
	}

	return &user, nil
}

//  User struct {
// 	Id        string    `json:"id,omitempty"`
// 	FirstName string    `json:"first-name,omitempty"`
// 	LastName  string    `json:"last-name,omitempty"`
// 	Email     string    `json:"email,omitempty"`
// 	Password  string    `json:"-"`
// 	CreatedAt time.Time `json:"created-at"`
// }
