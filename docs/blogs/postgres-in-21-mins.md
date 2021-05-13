---
title: PostgreSQL in 21 minutes
description: Quick refresher on PostgreSQL along with hands-on
author: Prasad Jayakumar
type: article
---
# PosgreSQL in 21 Minutes

## CLI Commands

```sql
-- Clear screen
\! clear

-- Expanded mode
\x
\x off

-- List all databases
\l

-- List of extensions
\dx

-- Connect to database
\c dbname 
```

# Managing Tables

```sql
-- List all tables
\d

-- Create a table
CREATE TABLE IF NOT EXISTS users (
 id INT GENERATED ALWAYS AS IDENTITY
 , username TEXT NOT NULL
 , email TEXT
 , PRIMARY KEY( id )
 , UNIQUE ( username )
 );

-- List of relations
-- -[ RECORD 1 ]----------
-- Schema | public
-- Name   | users
-- Type   | table
-- Owner  | swfqxxbylopjvu
-- -[ RECORD 2 ]----------
-- Schema | public
-- Name   | users_id_seq
-- Type   | sequence
-- Owner  | swfqxxbylopjvu

-- Describe a table
\d users

-- Insert a row
INSERT INTO users (username, email) VALUES ('myusername', 'myemail');

-- Select a table
SELECT * FROM users;

-- Create a temp table
CREATE TEMP TABLE temp_users AS SELECT * FROM users;

-- Drop table
DROP TABLE IF EXISTS users;

```
