package db

import (
	"database/sql"
	"fmt"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "api"
	password = "root_password"
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
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to database")

	return db
}
