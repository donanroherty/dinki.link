package main

import (
	"dinki.link/fileserver"

	"dinki.link/api"
	"dinki.link/db"
	"dinki.link/server"
	_ "github.com/lib/pq"
)

func main() {
	db := db.New()

	api := api.New(db)

	server.New(api)

	fileserver.New("/static")
}
