package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"
)

// New creates and returns a new database connection
func New(dbHost string, dbPort int) *sql.DB {
	user := os.Getenv("POSTGRES_API_USER")
	password := os.Getenv("POSTGRES_API_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable\n",
		dbHost, dbPort, user, password, dbname)

	fmt.Println("Opening db connection...")
	fmt.Printf("%s", psqlInfo)

	var err error

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Printf("Error opening postgres connection: %s\n", err)
	}

	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	attempt := 1

	for {
		connected := false
		select {
		case <-ticker.C:
			err := db.Ping()
			if err != nil {
				fmt.Printf("DB ping attempt %d failed: %s\n", attempt, err)
				attempt++
			} else {
				connected = true
			}
		}

		if connected {
			break
		}
	}

	fmt.Printf("Connected to database '%s'\n", dbname)

	return db
}
