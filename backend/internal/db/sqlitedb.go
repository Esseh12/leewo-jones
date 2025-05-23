package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
	"github.com/pressly/goose/v3"

	"github.com/Esseh12/leewo-jones/api/internal/model"
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

func (store SQLiteStore) GetPhotosByCategory(name string) []model.Photo {
	query := `SELECT id, title FROM photos WHERE category = ?;`
	rows, err := store.DB.Query(query, name)
	if err != nil {
		log.Println(err)
		return []model.Photo{}
	}
	var photos []model.Photo
	for rows.Next() {
		var p model.Photo
		err = rows.Scan(&p.Id, &p.Title)
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
