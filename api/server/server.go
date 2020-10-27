package server

import (
	"fmt"
	"log"
	"mime"
	"net/http"
	"strings"

	"dinki.link/randomid"

	"dinki.link/api"
)

const (
	port   = 80
	fsPath = "/srv/www/dinkilink/"
)

// RouteHandler responds to a HTTP request.  Overrides default with custom request handling
type RouteHandler struct {
	webPath string
	api     *api.API
}

func (handler *RouteHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	route := strings.ReplaceAll(r.URL.Path, "/", "")
	isValidShortID := randomid.IsValidID(route, 4)

	if isValidShortID {
		handler.api.HandleLinkRedirect(w, r)
	} else {
		http.FileServer(http.Dir(handler.webPath)).ServeHTTP(w, r)
	}

	return
}

// New creates and launches a new http server
func New(webPath string, api *api.API) *http.Server {
	mime.AddExtensionType(".js", "text/javascript")

	http.HandleFunc("/api/selectAll", api.HandleSelectAll)
	http.HandleFunc("/api/new", api.HandleNew)
	handler := &RouteHandler{webPath: webPath, api: api}
	http.Handle("/", handler)
	// http.Handle("/static/", handler)
	// http.Handle("/static/", handler)

	server := &http.Server{Addr: fmt.Sprint(":", port), Handler: nil}

	log.Println("Server listening on:", port)
	err := server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		log.Fatalf("ListenAndServe(): %v", err)
	}

	return server
}
