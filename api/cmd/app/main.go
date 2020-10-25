package main

import (
	"flag"

	"dinki.link/api"
	"dinki.link/db"
	"dinki.link/server"
	_ "github.com/lib/pq"
)

func main() {
	dbHost := flag.String("dbhost", "dinkilink_db", "DB hostname")
	dbPort := flag.Int("dbport", 5432, "DB port")
	webPath := flag.String("webpath", "/srv/www/dinkilink/", "Path to directory containing static website files")
	flag.Parse()

	db := db.New(*dbHost, *dbPort)

	api := api.New(db)

	server.New(*webPath, api)
}
