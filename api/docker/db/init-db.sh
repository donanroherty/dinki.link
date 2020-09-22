#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_API_USER
    WITH PASSWORD '$POSTGRES_API_PASSWORD';
    
    CREATE TABLE links (
        id SERIAL PRIMARY KEY UNIQUE,
        url TEXT NOT NULL,
        short_id TEXT NOT NULL,
        hits INT,
        date_added TIMESTAMP NOT NULL
    );

    GRANT SELECT, INSERT, UPDATE ON TABLE links TO $POSTGRES_API_USER;
    GRANT SELECT, INSERT, UPDATE ON TABLE links_id_seq TO $POSTGRES_API_USER;
   
EOSQL