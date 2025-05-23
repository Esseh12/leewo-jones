package model

type Store interface {
	GetPhotosByCategory(string) []Photo
}
