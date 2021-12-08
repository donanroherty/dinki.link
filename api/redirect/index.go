package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/url"

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
	v, err := q.Documents(ctx).Next()
	if err != nil {
		if err == iterator.Done {
			lib.HandleApiErr(w, err, http.StatusNotFound)
			return
		}

		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	iurl, ok := v.Data()["url"]
	if !ok {
		lib.HandleApiErr(w, fmt.Errorf("could not find key ['url] in query result"), http.StatusInternalServerError)
		return
	}

	strUrl := iurl.(string)

	u, err := url.Parse(strUrl)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	// If link has no scheme, assume https://
	var scheme string
	if len(u.Scheme) == 0 {
		scheme = "https://"
	}

	final := scheme + strUrl

	http.Redirect(w, r, final, http.StatusPermanentRedirect)
	log.Printf("redirect successful: %s -> %s", id, final)
}
