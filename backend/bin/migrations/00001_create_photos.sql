-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS photos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    sub_category TEXT,
    description TEXT,
    format TEXT,
    resolution TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    popularity REAL DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    thumbnail_url TEXT,
    image TEXT,
    discount REAL DEFAULT 0
);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS photos;
-- +goose StatementEnd





-- type Photo struct {
-- 	Id           string    `json:"id"`
-- 	Title        string    `json:"title"`
-- 	Price        float64   `json:"price"`
-- 	Category     string    `json:"catgeory"`
-- 	SubCategory  string    `json:"sub-category"`
-- 	Description  string    `json:"description"`
-- 	Format       string    `json:"format"` // JPEG, GIF etc
-- 	Resolution   string    `json:"resolution"`
-- 	CreatedAt    time.Time `json:"date-uploaded"`
-- 	Popularity   float64   `json:"popularity"`
-- 	Downloads    int       `json:"downloads"`
-- 	ThumbnailUrl string    `json:"thumbnail-url"`
-- 	Image        string    `json:"image-url"`
-- 	Discount     float64   `json:"discount"` // in percent e.g 0.1, 0.15 to mean 10%, 15% discount
-- }