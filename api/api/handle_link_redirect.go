package api

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"

	"dinki.link/randomid"
)

// HandleLinkRedirect redirects user from a dinki link to original site
func (api *API) HandleLinkRedirect(w http.ResponseWriter, r *http.Request) {
	route := strings.SplitAfter(r.URL.Path, "/")
	if len(route) == 0 {
		return
	}

	shortID := route[1]

	if randomid.IsValidID(shortID, 4) == false {
		return
	}

	link, err := api.queryID(shortID)

	if err != nil {
		if err == sql.ErrNoRows {
			log.Printf("Error: Link not found [%s]. %s\n", shortID, err)
			// TODO: Redirect to 404
			return
		}

		log.Println("HandleLinkRedirect: ", err)
		fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
		w.WriteHeader(http.StatusPermanentRedirect)
		return
	}

	u, err := url.Parse(link.URL)
	if err != nil {
		log.Println(err)
	}

	// If link has no scheme, assume https://
	var scheme string
	if len(u.Scheme) == 0 {
		scheme = "https://"
	}

	url := scheme + link.URL

	http.Redirect(w, r, url, http.StatusPermanentRedirect)
}

func (api *API) queryID(id string) (*Link, error) {
	query := fmt.Sprintf("SELECT * FROM links WHERE SHORT_ID='%s' LIMIT 1", id)

	row := api.db.QueryRow(query)

	var link Link

	err := row.Scan(&link.ID, &link.URL, &link.ShortID, &link.Hits, &link.DateAdded)

	return &link, err
}
