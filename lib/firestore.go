package lib

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
)

func GetFirestore(ctx context.Context) (*firestore.Client, error) {
	credsB64 := os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")
	creds, err := base64.StdEncoding.DecodeString(credsB64)
	if err != nil {
		fmt.Printf("error decoding: %v\n", err)
	}

	opt := option.WithCredentialsJSON([]byte(creds))
	config := &firebase.Config{ProjectID: "dinkilink-27088"}
	app, err := firebase.NewApp(ctx, config, opt)

	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}

	firestore, err := app.Firestore(ctx)

	if err != nil {
		return nil, fmt.Errorf("error connecting to firestore: %v", err)
	}

	return firestore, err
}

func GetLinksCollection(ctx context.Context) (*firestore.CollectionRef, error) {
	fs, err := GetFirestore(ctx)
	if err != nil {
		return nil, err
	}

	env := os.Getenv("VERCEL_ENV")

	table := "links"
	if env == "development" || env == "preview" {
		table = "links_dev"
	}

	col := fs.Collection(table)
	return col, nil
}
