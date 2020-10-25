package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// HandleSelectAll handles GET requests and responds with rows in the links table
func (api *API) HandleSelectAll(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		links, err := api.SelectAll()

		if err != nil {
			fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		err = json.NewEncoder(w).Encode(links)
		if err != nil {
			log.Println(err)
			fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
			return
		}
	}
}

// SelectAll returns all rows from the links table
func (api *API) SelectAll() ([]*Link, error) {
	rows, err := api.db.Query("SELECT * FROM links")
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
