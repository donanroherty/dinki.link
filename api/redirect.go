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
		lib.HandleApiErr("Redirect", "id query param not found", fmt.Errorf("id query param not found"), w)
		return
	}

	ctx := context.Background()
	fs, err := lib.GetFirestore(ctx)
	if err != nil {
		lib.HandleApiErr("Redirect", "error getting firestore", err, w)
		// todo: Internal server error
		return
	}

	q := fs.Collection("links").Where("ShortID", "==", id)
	v, err := q.Documents(ctx).Next()
	if err != nil {
		if err == iterator.Done {
			lib.HandleApiErr("Redirect", "link with short id not found", err, w)
			return
		}

		lib.HandleApiErr("Redirect", "", err, w)
		return
	}

	if v.Data()["URL"] == nil {
		lib.HandleApiErr("Redirect", "malformed json", fmt.Errorf("malformed json"), w)
		return
	}

	strUrl := v.Data()["URL"].(string)

	u, err := url.Parse(strUrl)
	if err != nil {
		log.Println(err)
		lib.HandleApiErr("Redirect", "malformed json", fmt.Errorf("malformed json"), w)
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
