package api

import (
	"context"
	"fmt"
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
	fs, err := lib.GetFirestore(ctx)
	if err != nil {
		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	q := fs.Collection("links").Where("ShortID", "==", id)
	v, err := q.Documents(ctx).Next()
	if err != nil {
		if err == iterator.Done {
			lib.HandleApiErr(w, err, http.StatusNotFound)
			return
		}

		lib.HandleApiErr(w, err, http.StatusInternalServerError)
		return
	}

	if v.Data()["url"] == nil {
		lib.HandleApiErr(w, fmt.Errorf("malformed json"), http.StatusInternalServerError)
		return
	}

	strUrl := v.Data()["url"].(string)

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
}
