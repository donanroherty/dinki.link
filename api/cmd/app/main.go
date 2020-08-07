package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"dinki.link/util/randomid"
)

// Create REST api for POSTing and GETing links
// Generate unique ids and return to user
// Create database (mongo)

// Link is the data container for new link requests posted to the server
type Link struct {
	url string
}

func main() {
	http.HandleFunc("/new", handleNew)
	http.ListenAndServe(":8080", nil)
}

func handleNew(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "url: %s\nmethod:%s\n", r.URL, r.Method)
	if r.Method == "POST" {
		handlePostNew(w, r)
	}
}

func handlePostNew(w http.ResponseWriter, r *http.Request) {

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
