package server

import (
	"fmt"
	"log"
	"net/http"

	"dinki.link/app"
)

// New creates and launches a new http server
func New(app *app.App) *http.Server {
	http.HandleFunc("/api/new", app.HandleNew)
	http.HandleFunc("/api/selectAll", app.HandleSelect)

	fmt.Println("Launching http server...")

	// http.ListenAndServe(":8080", nil)

	server := &http.Server{Addr: ":8080", Handler: nil}
	server.ListenAndServe()
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("ListenAndServe(): %v", err)
		}
	}()

	return server
}
