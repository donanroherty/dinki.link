package app

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"dinki.link/randomid"
)

// LinkRequest holds incomming body data for /new endpoint
type LinkRequest struct {
	URL string `json:"url"`
}

// LinkResponse holds outgoing response data
type LinkResponse struct {
	ShortID string `short_id:"url"`
}

//HandleNew is a test handler.  Responds with mock json for new random id
func (app *App) HandleNew(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var lReq LinkRequest

		err := json.NewDecoder(r.Body).Decode(&lReq)
		if err != nil {
			log.Println(err)
			fmt.Fprintf(w, "%d - %s:\n%s", http.StatusBadRequest, http.StatusText(http.StatusBadRequest), err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		newShortID := randomid.New(4)

		qry := fmt.Sprintf("SELECT * FROM links WHERE short_id = '%s'", newShortID)
		rows := app.db.QueryRow(qry)

		hasRow := true

		var l Link
		err = rows.Scan(&l)

		if err != nil {
			if err == sql.ErrNoRows {
				hasRow = false
			} else {
				log.Println(err)
				fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
		}

		var lRes LinkResponse

		// use exsting short id if it exists
		if hasRow {
			lRes = LinkResponse{ShortID: l.ShortID}
		} else {
			date := time.Now().Format("2006-01-02 15:04:05")
			link := Link{URL: lReq.URL, ShortID: newShortID, Hits: 0, DateAdded: date}

			qry := fmt.Sprintf("INSERT INTO LINKS (url, short_id, hits, date_added) values ('%s', '%s', %d, TIMESTAMP '%s')",
				link.URL, link.ShortID, link.Hits, link.DateAdded)

			_, err := app.db.Exec(qry)

			if err != nil {
				log.Println(err)
				fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			lRes = LinkResponse{ShortID: newShortID}
		}

		err = json.NewEncoder(w).Encode(lRes)
		if err != nil {
			log.Println(err)
			fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}
