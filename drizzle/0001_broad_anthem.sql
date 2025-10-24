ALTER TABLE "budgets" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "pots" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;