package main

import (
	_ "github.com/Esseh12/leewo-jones/api/docs"
	"github.com/Esseh12/leewo-jones/api/internal/config"
	"github.com/Esseh12/leewo-jones/api/internal/db"
	"github.com/Esseh12/leewo-jones/api/internal/server"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files" // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           Swagger Documentation For Leewo-Photo Platform's API
// @version         1.0
// @description     some documenation for the apis
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:10000
// @BasePath  /api/v1

// @securityDefinitions.apikey ApiKeyAuth
// @in Authorization
// @name Authorization
// @description "put the key in this format `Bearer eyJhbGciOiJIsP8`"

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
	cfg := config.New()
	r := gin.Default()

	// for swagger!
	// docs.SwaggerInfo.BasePath = "/api/v1" // this or use the comment format to set all the neccessary parameters

	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	store := db.SQLiteStore{
		DB: db.InitDB(),
	}
	defer store.DB.Close()

	db.RunMigrations(store.DB)

	server := server.New(cfg, r, store)
	server.RegisterRoutes()

	server.Start()
}
