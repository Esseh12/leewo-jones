package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Host string
	Port string
}

func New() *Config {
	if os.Getenv("ENV") != "production" {
		log.Println("Loading DEV environment variables.")
		err := godotenv.Load()
		if err != nil {
			log.Fatal("error loading env variables!", err)
		}
	} else {
		log.Println("in production environment.")
	}

	return &Config{
		Host: getEnv("HOST", ""),
		Port: getEnv("PORT", "5000"),
	}
}

func getEnv(key, default_value string) string {

	h := os.Getenv(key)
	if h == "" {
		return default_value
	}

	return h
}

// func mustGetEnv(key string) string {

// 	h := os.Getenv(key)
// 	if h == "" {
// 		log.Fatalf("%s must be supplied\n", key)
// 	}

// 	return h
// }

// func getINT(key string) int {

// 	h := os.Getenv(key)
// 	if h == "" {
// 		log.Fatalf("%s must be supplied\n", key)
// 	}
// 	i, err := strconv.Atoi(h)
// 	if err != nil {
// 		log.Fatalf("%s cannot be convered to int\n", key)
// 	}

// 	return i
// }
