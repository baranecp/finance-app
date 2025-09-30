CREATE TYPE "public"."transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(100) NOT NULL,
	"maximum" numeric NOT NULL,
	"theme" varchar(50) NOT NULL,
	CONSTRAINT "budgets_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE "pots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"target" numeric NOT NULL,
	"total" numeric NOT NULL,
	"theme" varchar(50) NOT NULL,
	CONSTRAINT "pots_theme_unique" UNIQUE("theme")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"avatar" varchar(255),
	"name" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"type" "transaction_type" NOT NULL,
	"amount" numeric NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"recurring" boolean DEFAULT false NOT NULL
);
