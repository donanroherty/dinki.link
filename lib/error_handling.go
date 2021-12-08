package lib

import (
	"fmt"
	"log"
	"net/http"
)

func HandleApiErr(endpoint string, msg string, err error, w http.ResponseWriter) {
	log.Printf("%s | %s: %s", endpoint, msg, err)
	fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
}
