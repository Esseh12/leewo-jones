package services

import (
	"log"

	"github.com/Esseh12/leewo-jones/api/internal/model"
	"github.com/Esseh12/leewo-jones/api/pkg/utils"
)

type AuthService struct {
	Store model.Store
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
