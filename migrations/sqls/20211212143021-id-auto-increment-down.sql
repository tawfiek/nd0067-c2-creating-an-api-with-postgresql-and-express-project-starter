ALTER TABLE IF EXISTS public.orders
    ALTER COLUMN id DROP IDENTITY;

ALTER TABLE IF EXISTS public.order_product
    ALTER COLUMN id DROP IDENTITY;

ALTER TABLE IF EXISTS public.users
    ALTER COLUMN id DROP IDENTITY;