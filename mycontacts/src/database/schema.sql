CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID not null UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);
