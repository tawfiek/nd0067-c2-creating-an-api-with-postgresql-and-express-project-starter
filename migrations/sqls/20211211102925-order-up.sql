CREATE TABLE "public"."orders" (
	"id" serial,
	"user_id" int4 NOT NULL,
	"order_status" int4 NOT NULL,
	PRIMARY KEY ("id")
);


ALTER TABLE "public"."orders"
	ADD FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON
			UPDATE
				RESTRICT ON DELETE RESTRICT;
        