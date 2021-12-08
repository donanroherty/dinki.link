package lib

import "encoding/json"

type Link struct {
	URL       string `json:"url"`
	ShortID   string `json:"short_id"`
	Hits      int    `json:"hits"`
	DateAdded string `json:"date_added"`
}

func MapLink(l Link) (map[string]interface{}, error) {
	j, err := json.Marshal(l)
	if err != nil {
		return nil, err
	}

	var v map[string]interface{}
	err = json.Unmarshal(j, &v)
	if err != nil {
		return nil, err
	}

	return v, nil
}
