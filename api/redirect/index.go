package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/url"

	"cloud.google.com/go/firestore"
	"github.com/donanroherty/dinkilink/lib"
	"google.golang.org/api/iterator"
)

func Redirect(w http.ResponseWriter, r *http.Request) {
	qs := r.URL.Query()
	id := qs.Get("id")
	if len(id) == 0 {
		lib.HandleApiErr(w, fmt.Errorf("'id' query param not found"), http.StatusNotFound)
		return
	}

	ctx := context.Background()

	col, err := lib.GetLinksCollection(ctx)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	_, err = col.Documents(ctx).Next()
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusNotFound)
		return
	}

	q := col.Where("short_id", "==", id)
	linkData, err := q.Documents(ctx).Next()
	if err != nil {
		if err == iterator.Done {
			lib.HandleApiErr(w, err, http.StatusNotFound)
			return
		}

		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	iurl, ok := linkData.Data()["url"]
	if !ok {
		lib.HandleApiErr(w, fmt.Errorf("could not find key ['url'] in query result"), http.StatusInternalServerError)
		return
	}

	hits, ok := linkData.Data()["hits"]
	if !ok {
		lib.HandleApiErr(w, fmt.Errorf("could not find key ['hits'] in query result"), http.StatusInternalServerError)
		return
	}

	fHits := hits.(float64) + 1
	linkData.Ref.Set(ctx, map[string]interface{}{"hits": fHits}, firestore.MergeAll)

	sUrl := iurl.(string)

	u, err := url.Parse(sUrl)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	// If link has no scheme, assume https://
	var scheme string
	if len(u.Scheme) == 0 {
		scheme = "https://"
	}

	final := scheme + sUrl

	http.Redirect(w, r, final, http.StatusPermanentRedirect)
	log.Printf("redirect successful: %s -> %s", id, final)
}
