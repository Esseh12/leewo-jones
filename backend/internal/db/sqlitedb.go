package db

import (
	"database/sql"
	"errors"
	"log"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
	"github.com/pressly/goose/v3"

	"github.com/Esseh12/leewo-jones/api/internal/model"
	"github.com/Esseh12/leewo-jones/api/pkg/utils"
)

func InitDB() *sql.DB {
	db, err := sql.Open("sqlite3", "leewo.db")
	if err != nil {
		log.Fatalln("erro opening db connection", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatalln("error pinging db", err)
	}
	return db
}

type SQLiteStore struct {
	DB *sql.DB
}

//  id TEXT PRIMARY KEY,
//     title TEXT NOT NULL,
//     price REAL NOT NULL,
//     category TEXT,
//     sub_category TEXT,
//     description TEXT,
//     format TEXT,
//     resolution TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     popularity REAL DEFAULT 0,
//     downloads INTEGER DEFAULT 0,
//     thumbnail_url TEXT,
//     image TEXT,
//     discount REAL DEFAULT 0

func (store SQLiteStore) GetPhotosByCategory(name string) []model.Photo {
	query := `SELECT id, title, price, sub_category, format, created_at, popularity, thumbnail_url, image, discount FROM photos WHERE category = ?;`
	rows, err := store.DB.Query(query, name)
	if err != nil {
		log.Println(err)
		return []model.Photo{}
	}
	var photos []model.Photo
	for rows.Next() {
		var p model.Photo
		err = rows.Scan(
			&p.Id, &p.Title, &p.Price,
			&p.SubCategory, &p.Format, &p.CreatedAt,
			&p.Popularity, &p.ThumbnailUrl, &p.Image,
			&p.Discount,
		)
		if err != nil {
			log.Println("error scaning record", err)
			continue
		}
		photos = append(photos, p)
	}
	return photos

	// return []model.Photo{
	// 	{Id: "1", Title: "some pic 1", Price: 122.232, Category: "bike", Description: "some descriptooomd"},
	// 	{Id: "2", Title: "some pic 2", Price: 1234.22, Category: "bike", Description: "some descriptooomd"},
	// 	{Id: "3", Title: "some pic 3", Price: 3412.22, Category: "bike", Description: "some descriptooomd"},
	// }
}

// this gets feautured photos
func (store SQLiteStore) GetFeaturedPhotos() []model.Photo {
	query := `SELECT id, title, price, popularity, thumbnail_url, discount FROM photos WHERE featured = 1;`
	rows, err := store.DB.Query(query)
	if err != nil {
		log.Println(err)
		return []model.Photo{}
	}
	var photos []model.Photo
	for rows.Next() {
		var p model.Photo
		err = rows.Scan(
			&p.Id, &p.Title, &p.Price,
			&p.Popularity, &p.ThumbnailUrl,
			&p.Discount,
		)
		if err != nil {
			log.Println("error scaning record", err)
			continue
		}
		photos = append(photos, p)
	}
	return photos
}

func (store SQLiteStore) GetLatestNArrivals(num int) []model.Photo {
	query := `SELECT id, title, price, popularity, thumbnail_url, discount FROM photos ORDER BY created_at DESC LIMIT ?;`
	rows, err := store.DB.Query(query, num)
	if err != nil {
		log.Println(err)
		return []model.Photo{}
	}
	var photos []model.Photo
	for rows.Next() {
		var p model.Photo
		err = rows.Scan(
			&p.Id, &p.Title, &p.Price,
			&p.Popularity, &p.ThumbnailUrl,
			&p.Discount,
		)
		if err != nil {
			log.Println("error scaning record", err)
			continue
		}
		photos = append(photos, p)
	}
	return photos
}

func (store SQLiteStore) SigninUser(email, password string) (*model.User, error) {
	var user model.User
	err := store.GetUserByEmail(&user, email)
	if err != nil {
		log.Println("error getting user by email", err)
		return nil, err
	}
	err = utils.CompareHash(user.Password, password)
	if err != nil {
		log.Println("error comparing user hashed password", err)
		return nil, errors.New("incorrect password")
	}

	return &user, nil
}

func (store SQLiteStore) CreateUser(email string, hashed string) (id string, err error) {
	id = uuid.New().String()
	query := `INSERT INTO users (id, email, hashed_password) VALUES(?,?,?);`
	_, err = store.DB.Exec(query, id, email, hashed)
	if err != nil {
		log.Println("error executing insert into users", err)
		id = ""
		return
	}
	return
}

func (store SQLiteStore) GetUserById(userPtr *model.User, id string) error {
	query := `SELECT id, email FROM users WHERE id = ?;`

	row := store.DB.QueryRow(query, id)
	if err := row.Scan(&userPtr.Id, &userPtr.Email); err != nil {
		log.Println("error fetching user", err)
		return err
	}
	return nil
}

func (store SQLiteStore) GetUserByEmail(userPtr *model.User, email string) error {
	query := `SELECT id, email, hashed_password FROM users WHERE email = ?;`

	row := store.DB.QueryRow(query, email)
	if err := row.Scan(&userPtr.Id, &userPtr.Email, &userPtr.Password); err != nil {
		log.Println("error fetching user by email", err)
		return errors.New("no user with such email")
	}
	return nil
}

func RunMigrations(db *sql.DB) {
	// Set the dialect for Goose
	if err := goose.SetDialect("sqlite3"); err != nil {
		log.Fatalf("failed to set dialect: %v", err)
	}

	// Run migrations from the db/migrations folder
	if err := goose.Up(db, "migrations"); err != nil {
		log.Fatalf("failed to run migrations: %v", err)
	}
	// Continue booting your server...
	log.Println("Migrations applied successfully")
}
