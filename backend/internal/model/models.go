package model

import "time"

type Photo struct {
	Id           string    `json:"id"`
	Title        string    `json:"title"`
	Price        float64   `json:"price"`
	Category     string    `json:"catgeory"`
	SubCategory  string    `json:"sub-category"`
	Description  string    `json:"description"`
	Format       string    `json:"format"` // JPEG, GIF etc
	Resolution   string    `json:"resolution"`
	CreatedAt    time.Time `json:"date-uploaded"`
	Popularity   float64   `json:"popularity"`
	Downloads    int       `json:"downloads"`
	ThumbnailUrl string    `json:"thumbnail-url"`
	Image        string    `json:"image-url"`
	Discount     float64   `json:"discount"` // in percent e.g 0.1, 0.15 to mean 10%, 15% discount
}
