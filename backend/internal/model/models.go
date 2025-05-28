package model

import "time"

type Photo struct {
	Id           string    `json:"id,omitempty"`
	Title        string    `json:"title,omitempty"`
	Price        float64   `json:"price,omitempty"`
	Category     string    `json:"catgeory,omitempty"`
	SubCategory  string    `json:"sub-category,omitempty"`
	Description  string    `json:"description,omitempty"`
	Format       string    `json:"format,omitempty"` // JPEG, GIF etc
	Resolution   string    `json:"resolution,omitempty"`
	CreatedAt    time.Time `json:"date-uploaded,omitempty"`
	Popularity   float64   `json:"popularity,omitempty"`
	Downloads    int       `json:"downloads,omitempty"`
	ThumbnailUrl string    `json:"thumbnail-url,omitempty"`
	Image        string    `json:"image-url,omitempty"`
	Discount     float64   `json:"discount,omitempty"` // in percent e.g 0.1, 0.15 to mean 10%, 15% discount
}

type User struct {
	Id        string    `json:"id,omitempty"`
	FirstName string    `json:"first-name,omitempty"`
	LastName  string    `json:"last-name,omitempty"`
	Email     string    `json:"email,omitempty"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"-"`
}
