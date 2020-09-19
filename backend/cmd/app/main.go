package main

import (
	"fmt"

	"dinki.link/app"
	"dinki.link/db"
	"dinki.link/server"

	_ "github.com/lib/pq"
)

func main() {
	fmt.Println("Initializing api...")

	db := db.New()

	app := app.New(db)

	server.New(app)
}
