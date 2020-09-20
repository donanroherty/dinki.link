package app

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// HandleSelect handles GET requests and responds with rows in the links table
func (app *App) HandleSelect(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		links, err := app.SelectAll()

		if err != nil {
			fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
			w.WriteHeader(http.StatusInternalServerError)
		}

		err = json.NewEncoder(w).Encode(links)
		if err != nil {
			log.Println(err)
			fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
		}
	}
}
