package lib

import (
	"math/rand"
	"strings"
	"time"
)

const (
	// Alphabet is the collection of numbers and letter which available to the random id generator.
	Alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
)

// ShortID generates a random id of a given size
func ShortID(size int) string {
	// Seed a new source with current time
	src := rand.NewSource(time.Now().UnixNano())

	// Create a new rand from source
	r := rand.New(src)

	var id string
	for i := 0; i < size; i++ {
		idx := r.Intn(len(Alphabet))
		char := strings.Split(Alphabet, "")[idx]
		id = id + char
	}

	return id
}

// IsValidID returns true if input string has valid characters and length
func IsValidID(input string, validLength int) bool {
	if len(input) != validLength {
		return false
	}
	for _, char := range input {
		if strings.Contains(Alphabet, string(char)) {
			return false
		}
	}

	return true
}
