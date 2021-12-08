package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/donanroherty/dinkilink/lib"
)

func BulkAdd(w http.ResponseWriter, r *http.Request) {
	log.Println("got here!!!!!!!")
	if r.Method != "POST" {
		return
	}

	type reqBody struct {
		Links []lib.Link `json:"links"`
	}

	var lArr reqBody
	err := json.NewDecoder(r.Body).Decode(&lArr)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	fs, err := lib.GetFirestore(ctx)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
	}

	col := fs.Collection("links")
	if col == nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
	}

	for _, l := range lArr.Links {
		m, err := lib.MapLink(l)
		if err != nil {
			break
		}
		_, _, err = col.Add(ctx, m)
		if err != nil {
			break
		}
	}

	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
	}
}
