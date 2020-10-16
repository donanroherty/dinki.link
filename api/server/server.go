package server

import (
	"fmt"
	"log"
	"net/http"

	"dinki.link/api"
)

// New creates and launches a new http server
func New(api *api.API) *http.Server {
	http.HandleFunc("/api/select", api.HandleSelect)
	http.HandleFunc("/api/new", api.HandleNew)

	fmt.Println("Launching http server...")

	server := &http.Server{Addr: ":8080", Handler: nil}

	// go func() {
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("ListenAndServe(): %v", err)
	}
	// }()

	return server
}
