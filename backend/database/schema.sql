-- DROP SCHEMA public;
CREATE SCHEMA public AUTHORIZATION pg_database_owner;
-- DROP SEQUENCE domains_id_seq;
CREATE SEQUENCE domains_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- DROP SEQUENCE users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
-- public.domains definition
-- Drop table
-- DROP TABLE domains;
CREATE TABLE domains (
    id serial4 NOT NULL,
    "name" varchar(255) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
    created_by int4 NOT NULL,
    CONSTRAINT domains_pkey PRIMARY KEY (id)
);
-- public.users definition
-- Drop table
-- DROP TABLE users;
CREATE TABLE users (
    id serial4 NOT NULL,
    username varchar(25) NOT NULL,
    "password" varchar(255) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
);