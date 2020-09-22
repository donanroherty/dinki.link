package db

import (
	"database/sql"
	"fmt"
	"log"
)

const (
	host     = "dinkilink_db"
	port     = 5432
	user     = "api"
	password = "password"
	dbname   = "dinkilink"
)

// New creates and returns a new database connection
func New() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable\n",
		host, port, user, password, dbname)

	fmt.Println("Opening db connection...")
	fmt.Printf("%s", psqlInfo)

	var err error

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Printf("Error opening postgres connection: %s\n", err)
		// panic(err)
	}

	err = db.Ping()
	if err != nil {
		log.Println("Pinging database...")
		panic(err)
	}

	fmt.Println("Connected to database")

	return db
}
