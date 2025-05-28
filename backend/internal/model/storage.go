package model

type Store interface {
	GetPhotosByCategory(string) []Photo
	GetFeaturedPhotos() []Photo
	GetLatestNArrivals(int) []Photo
	CreateUser(email string, hashed string) (id string, err error)
	GetUserById(userPtr *User, id string) error
}
