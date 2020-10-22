package fileserver

import (
	"log"
	"net/http"
)

// New creates a new fileserver
func New(path string) {
	http.Handle("/", http.FileServer(http.Dir(path)))

	go func() {
		if err := http.ListenAndServe(":80", nil); err != nil {
			log.Fatal("ListenAndServe; ", err)
		}
	}()
}
