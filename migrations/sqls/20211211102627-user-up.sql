CREATE TABLE IF NOT EXISTS "users" (
	"id" serial,
	"username" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"password" varchar NOT NULL,
	PRIMARY KEY ("id")
);