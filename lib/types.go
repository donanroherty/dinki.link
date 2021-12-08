package lib

type Link struct {
	URL       string `json:"url"`
	ShortID   string `json:"short_id"`
	Hits      int    `json:"hits"`
	DateAdded string `json:"date_added"`
}
