package app

import (
	"encoding/json"
	"fmt"
	"net/http"

	"dinki.link/randomid"
)

//HandleNew is a test handler.  Responds with mock json for new random id
func (app *App) HandleNew(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "url: %s\nmethod:%s\n", r.URL, r.Method)
	if r.Method == "POST" {
		dec := json.NewDecoder(r.Body)

		var l Link
		err := dec.Decode(&l)

		if err != nil {
			fmt.Fprintf(w, "%s", err)
			return
		}

		fmt.Fprintf(w, "body: %+v\n", l)

		id := randomid.New(4)
		fmt.Fprintf(w, "id: %s\n", id)
	}
}
