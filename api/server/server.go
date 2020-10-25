package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"

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
	uri := r.URL.Path
	if uri == "/" {
		http.FileServer(http.Dir(handler.webPath)).ServeHTTP(w, r)
	} else {
		route := strings.SplitAfter(uri, "/")
		if len(route) > 1 {
			handler.api.HandleLinkRedirect(w, r)
		}
	}
	return
}

// New creates and launches a new http server
func New(webPath string, api *api.API) *http.Server {
	http.HandleFunc("/api/selectAll", api.HandleSelectAll)
	http.HandleFunc("/api/new", api.HandleNew)
	handler := &RouteHandler{webPath: webPath, api: api}
	http.Handle("/", handler)

	server := &http.Server{Addr: fmt.Sprint(":", port), Handler: nil}

	log.Println("Server listening on:", port)
	err := server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		log.Fatalf("ListenAndServe(): %v", err)
	}

	return server
}
