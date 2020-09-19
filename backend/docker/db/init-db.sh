#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_API_USER
    WITH PASSWORD '$POSTGRES_API_PASSWORD';
    
    CREATE TABLE links (
        id BIGSERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        short_link TEXT NOT NULL,
        hits INT,
        date_added DATE NOT NULL
    );

    GRANT SELECT, INSERT, UPDATE ON TABLE links TO $POSTGRES_API_USER;
   
EOSQL