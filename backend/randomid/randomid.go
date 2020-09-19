package randomid

import (
	"math/rand"
	"strings"
	"time"
)

// New generates a random id of a given size
func New(size int) string {
	alphabet := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

	// Seed a new source with current time
	src := rand.NewSource(time.Now().UnixNano())

	// Create a new roand from source
	r := rand.New(src)

	var id string
	for i := 0; i < size; i++ {
		idx := r.Intn(len(alphabet))
		char := strings.Split(alphabet, "")[idx]
		id = id + char
	}

	return id
}
