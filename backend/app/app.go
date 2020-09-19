package app

import (
	"database/sql"
)

// Link represents a row in the links table
type Link struct {
	ID        uint8
	URL       string
	ShortLink string
	Hits      uint8
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
