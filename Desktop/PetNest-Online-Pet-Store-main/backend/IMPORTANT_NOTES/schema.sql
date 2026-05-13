
--Note: I made the database directly on supabase, as I am not that familiar with sql yet. Here is the generated SQL of the database as seen on the image.

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.OrderItems (
  OrderItemID uuid NOT NULL DEFAULT gen_random_uuid(),
  OrderID uuid NOT NULL,
  PetID uuid NOT NULL,
  Quantity smallint NOT NULL,
  PriceAtPurchase numeric NOT NULL,
  CONSTRAINT OrderItems_pkey PRIMARY KEY (OrderItemID),
  CONSTRAINT OrderItems_OrderID_fkey FOREIGN KEY (OrderID) REFERENCES public.Orders(OrderID),
  CONSTRAINT OrderItems_PetID_fkey FOREIGN KEY (PetID) REFERENCES public.Pet(PetID)
);
CREATE TABLE public.Orders (
  OrderID uuid NOT NULL DEFAULT gen_random_uuid(),
  UserID uuid NOT NULL,
  TotalAmt numeric NOT NULL,
  Status text NOT NULL DEFAULT 'pending'::text,
  CreatedAt timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT Orders_pkey PRIMARY KEY (OrderID),
  CONSTRAINT Orders_UserID_fkey FOREIGN KEY (UserID) REFERENCES public.Profiles(ID)
);
CREATE TABLE public.Pet (
  PetID uuid NOT NULL DEFAULT gen_random_uuid(),
  PetName text NOT NULL,
  PetBreed text NOT NULL,
  PetAge smallint NOT NULL,
  PetPrice numeric NOT NULL,
  PetCategory text NOT NULL,
  PetImg text NOT NULL,
  PetDescription text NOT NULL,
  CONSTRAINT Pet_pkey PRIMARY KEY (PetID)
);
CREATE TABLE public.Profiles (
  ID uuid NOT NULL,
  FirstName text,
  LastName text,
  ShippingAddress text,
  AuthRole text NOT NULL DEFAULT 'customer'::text,
  CONSTRAINT Profiles_pkey PRIMARY KEY (ID),
  CONSTRAINT Profiles_ID_fkey FOREIGN KEY (ID) REFERENCES auth.users(id)
);
CREATE TABLE public.UserCart (
  UserID uuid NOT NULL,
  PetID uuid NOT NULL,
  Quantity smallint NOT NULL,
  CONSTRAINT UserCart_pkey PRIMARY KEY (UserID, PetID),
  CONSTRAINT UserCart_UserID_fkey FOREIGN KEY (UserID) REFERENCES public.Profiles(ID),
  CONSTRAINT UserCart_PetID_fkey FOREIGN KEY (PetID) REFERENCES public.Pet(PetID)
);