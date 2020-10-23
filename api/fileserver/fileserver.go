package fileserver

import (
	"fmt"
	"log"
	"net/http"
)

const (
	port = 80
)

// New creates a new fileserver
func New(path string) {

	fs := http.FileServer(http.Dir("/srv/www/dinkilink/"))

	http.Handle("/", fs)

	fmt.Println("Launching static server on :", port)

	err := http.ListenAndServe(fmt.Sprint(":", port), nil)
	if err != nil {
		log.Fatal("ListenAndServe; ", err)
	}
}
