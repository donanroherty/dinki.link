package app

import (
	"database/sql"

	"dinki.link/db"
)

// Link represents a row in the links table
type Link struct {
	ID        int
	URL       string
	ShortLink string
	Hits      int
	DateAdded string
}

// App wraps the primary components of the applicaiton
type App struct {
	db *sql.DB
}

// New creates and returns a new app object
func New(db *sql.DB) *App {
	return &App{db: db}
}

// GetDB gets the DB
func (app *App) GetDB() *sql.DB {
	if app == nil {
		app.db = db.New()
	}

	return app.db
}
