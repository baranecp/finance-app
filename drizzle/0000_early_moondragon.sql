CREATE TYPE "transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(100) NOT NULL,
	"maximum" integer NOT NULL,
	"theme" varchar(50) NOT NULL,
	CONSTRAINT "budgets_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE "pots" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"target" integer NOT NULL,
	"theme" varchar(50) NOT NULL,
	CONSTRAINT "pots_theme_unique" UNIQUE("theme")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"avatar" varchar(255),
	"category" varchar(100) NOT NULL,
	"type" "transaction_type" NOT NULL,
	"amount" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"recurring" boolean DEFAULT false NOT NULL
);
