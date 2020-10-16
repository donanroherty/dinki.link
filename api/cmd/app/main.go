package main

import (
	"log"

	"dinki.link/api"
	"dinki.link/db"
	"dinki.link/server"
	_ "github.com/lib/pq"
)

func main() {
	log.Println("Server listening on :8080")

	db := db.New()

	api := api.New(db)

	server.New(api)
}
