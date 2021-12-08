package lib

import (
	"fmt"
	"log"
	"net/http"
	"runtime"
)

func HandleApiErr(w http.ResponseWriter, err error, code int) {
	msg := fmt.Sprintf("%s | %s", http.StatusText(code), err)

	c, _, _, ok := runtime.Caller(1)
	if ok {
		pc := []uintptr{c}
		frame, _ := runtime.CallersFrames(pc).Next()
		frameInfo := fmt.Sprintf("%s[%d]", frame.Function, frame.Line)
		msg = fmt.Sprintf("%s: %s", frameInfo, msg)
	}

	log.Println(msg)
	http.Error(w, http.StatusText(code), code)
}
