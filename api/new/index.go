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

	// var lReq reqBody
	var req map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		lib.HandleApiErr(w, err, http.StatusBadRequest)
		return
	}

	u, ok := req["url"]
	if !ok {
		lib.HandleApiErr(w, fmt.Errorf("missing 'url' property"), http.StatusBadRequest)
		return
	}

	url := fmt.Sprintf("%v", u)

	ctx := context.Background()
	fs, err := lib.GetFirestore(ctx)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	col := fs.Collection("links")

	// generate a new link
	id, err := genUniqueID(col, w)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	l := lib.Link{
		ShortID:   id,
		URL:       url,
		Hits:      0,
		DateAdded: time.Now().Format("2006-01-02 15:04:05"),
	}

	j, err := lib.MapLink(l)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	// add link to db
	_, _, err = col.Add(ctx, j)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	// respond
	body := make(map[string]interface{})
	body["short_id"] = id

	err = json.NewEncoder(w).Encode(body)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	log.Printf("Successfully created: %v\n", j)
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
