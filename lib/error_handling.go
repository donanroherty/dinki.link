package lib

import (
	"fmt"
	"log"
	"net/http"
)

func HandleApiErr(desc string, err error, w http.ResponseWriter) {
	log.Printf("%s: %s", desc, err)
	fmt.Fprintf(w, "%d - %s:\n%s", http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError), err)
}
