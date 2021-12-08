package api

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/donanroherty/dinkilink/lib"
)

// LinkRequest represents incomming body data for /new endpoint

// LinkResponse represents outgoing response data

func New(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		return
	}

	type reqBody struct {
		URL string `json:"url"`
	}

	type resBody struct {
		ShortID string `short_id:"url"`
	}

	var lReq reqBody

	err := json.NewDecoder(r.Body).Decode(&lReq)
	if err != nil {
		lib.HandleApiErr("JSON decoding failed", err, w)
		return
	}

	ctx := context.Background()
	fs, err := lib.GetFirestore(ctx)
	if err != nil {
		lib.HandleApiErr("GetFirestore failed", err, w)
		return
	}

	col := fs.Collection("links")

	id, err := genUniqueID(col, w)
	if err != nil {
		lib.HandleApiErr("", err, w)
		return
	}

	doc := lib.Link{
		ShortID:   id,
		URL:       lReq.URL,
		Hits:      0,
		DateAdded: time.Now().Format("2006-01-02 15:04:05"),
	}

	_, _, err = col.Add(ctx, doc)
	if err != nil {
		lib.HandleApiErr("Failed to add doc to firebase:", err, w)
		return
	}

	res := resBody{
		ShortID: id,
	}

	err = json.NewEncoder(w).Encode(res)
	if err != nil {
		lib.HandleApiErr("Failed to encode response", err, w)
		return
	}

	log.Printf("Successfully created: %v\n", doc)
}

// genUniqueID generates a new ID, ensuring that ID is not already used on the database
func genUniqueID(col *firestore.CollectionRef, w http.ResponseWriter) (string, error) {
	unique := false
	attempts := 0
	var id string

	for !unique && attempts < 5 {
		id = lib.ShortID(4)
		q := col.Where("ID", "==", id)
		docs, err := q.Documents(context.Background()).GetAll()

		if err != nil {
			return "", err
		}

		unique = len(docs) == 0
		attempts++
	}

	if !unique || len(id) == 0 {
		return "", fmt.Errorf("error generating unique ID")
	}

	return id, nil
}
