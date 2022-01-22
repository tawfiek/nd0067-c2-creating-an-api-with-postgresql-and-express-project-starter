CREATE TABLE "public"."order_product" (
	"id" serial,
	"order_id" int4 NOT NULL,
	"product_id" int4 NOT NULL,
	"quantity" int4 NOT NULL DEFAULT 1,
	PRIMARY KEY ("id")
);

ALTER TABLE "public"."order_product"
	ADD FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON
			UPDATE
				RESTRICT ON DELETE RESTRICT;

ALTER TABLE "public"."order_product"
	ADD FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON
			UPDATE
				CASCADE ON DELETE CASCADE;