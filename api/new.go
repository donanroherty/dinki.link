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
	"google.golang.org/api/iterator"
)

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
		lib.HandleApiErr("New", "JSON decoding failed", err, w)
		return
	}

	ctx := context.Background()
	fs, err := lib.GetFirestore(ctx)
	if err != nil {
		lib.HandleApiErr("New", "GetFirestore failed", err, w)
		return
	}

	col := fs.Collection("links")

	id, err := genUniqueID(col, w)
	if err != nil {
		lib.HandleApiErr("New", "Failure generating UID", err, w)
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
		lib.HandleApiErr("New", "Failure adding doc to firebase:", err, w)
		return
	}

	res := resBody{
		ShortID: id,
	}

	err = json.NewEncoder(w).Encode(res)
	if err != nil {
		lib.HandleApiErr("New", "Failed to encode response", err, w)
		return
	}

	log.Printf("New", "Successfully created: %v\n", doc)
}

// genUniqueID generates a new ID, ensuring that ID is not already used on the database
func genUniqueID(col *firestore.CollectionRef, w http.ResponseWriter) (string, error) {
	isUnique := false
	attempts := 0
	var id string

	for !isUnique && attempts < 5 {
		id = lib.ShortID(4)
		q := col.Where("ID", "==", id)
		_, err := q.Documents(context.Background()).Next()
		isUnique = err == iterator.Done
		attempts++
	}

	if !isUnique || len(id) == 0 {
		return "", fmt.Errorf("error generating unique ID")
	}

	return id, nil
}
