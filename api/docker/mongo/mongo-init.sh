if [ "$MONGO_API_USERNAME" ] && [ "$MONGO_API_PASSWORD" ]; then
                "${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
                db.createUser({
                    user: $(_js_escape "$MONGO_API_USERNAME"),
                    pwd: $(_js_escape "$MONGO_API_PASSWORD"),
                    roles: [ "readWrite", "dbAdmin" ]
                })
            EOJS
        fi