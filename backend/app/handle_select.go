package app

import (
	"fmt"
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

		for _, link := range links {
			fmt.Printf("%+v\n", *link)
			fmt.Fprintf(w, "%+v\n", *link)
		}

	}
}
