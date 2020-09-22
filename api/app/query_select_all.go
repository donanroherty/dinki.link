package app

import (
	"log"
)

// SelectAll returns all rows from the links table
func (app *App) SelectAll() ([]*Link, error) {
	rows, err := app.db.Query("SELECT * FROM links")
	if err != nil {
		log.Printf("SelectAll() error: %s\n", err)
		return nil, err
	}

	defer rows.Close()

	links := make([]*Link, 0)

	for rows.Next() {
		var link Link

		err := rows.Scan(&link.ID, &link.URL, &link.ShortID, &link.Hits, &link.DateAdded)
		if err != nil {
			log.Fatal(err)
		}

		links = append(links, &link)
	}

	rerr := rows.Close()
	if rerr != nil {
		log.Println(rerr)
	}

	err = rows.Err()
	if err != nil {
		log.Printf("Error: %s\n", err)
	}

	return links, nil
}
