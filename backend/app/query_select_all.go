package app

import (
	"database/sql"
	"log"
)

// SelectAll returns all rows from the links table
func (app *App) SelectAll() ([]*Link, error) {
	db := app.GetDB()

	err := db.Ping()
	if err != nil {
		log.Printf("%s\n", err)
		return nil, err
	}

	var rows *sql.Rows
	rows, err = app.db.Query("SELECT * FROM links")
	if err != nil {
		log.Printf("SelectAll() error: %s\n", err)
		return nil, err
	}

	var links []*Link

	for rows.Next() {
		var id int
		var url string
		var shortLink string
		var hits uint8
		var dateAdded string

		err := rows.Scan(&id, &url, &shortLink, &hits, &dateAdded)
		if err != nil {
			log.Printf("Error: %s\n", err)
		}

		// fmt.Println(id, url, shortID, hits, dateAdded)
		links = append(links, &Link{ID: uint8(id), URL: url, ShortLink: shortLink, Hits: hits, DateAdded: dateAdded})
	}

	err = rows.Err()
	if err != nil {
		log.Printf("Error: %s\n", err)
	}

	return links, nil
}
