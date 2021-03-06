package api

import (
	"database/sql"
)

// Link represents a row in the links table
type Link struct {
	ID        int
	URL       string
	ShortID   string
	Hits      int
	DateAdded string
}

// API wraps the primary components of the applicaiton
type API struct {
	db *sql.DB
}

// New creates and returns a new app object
func New(db *sql.DB) *API {
	return &API{db: db}
}
