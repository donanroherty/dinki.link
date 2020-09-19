package app

import (
	"fmt"
)

// SelectAll returns all rows from the links table
func (app *App) SelectAll() Link {
	rows, err := app.db.Query("SELECT * FROM links")
	if err != nil {
		fmt.Printf("%s", err)
	}
	defer rows.Close()

	var link Link

	rows.Scan(link)

	return link
}
