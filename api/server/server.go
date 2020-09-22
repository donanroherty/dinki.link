package server

import (
	"fmt"
	"log"
	"net/http"

	"dinki.link/app"
)

// New creates and launches a new http server
func New(app *app.App) *http.Server {
	http.HandleFunc("/api/select", app.HandleSelect)
	http.HandleFunc("/api/new", app.HandleNew)

	fmt.Println("Launching http server...")

	server := &http.Server{Addr: ":8080", Handler: nil}

	// go func() {
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("ListenAndServe(): %v", err)
	}
	// }()

	return server
}
