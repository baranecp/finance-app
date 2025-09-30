import { pgTable, serial, varchar, integer, timestamp, pgEnum, boolean} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const transactionType = pgEnum("transaction_type", ["income", "expense"]);

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  avatar: varchar("avatar", { length: 255 }),
  category: varchar("category", { length: 100 }).notNull(),
  type: transactionType("type").notNull(),
  amount: integer("amount").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  recurring: boolean("recurring").default(false).notNull(),
});

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull().unique(),
  maximum: integer("maximum").notNull(),
  theme: varchar("theme", { length: 50 }).notNull(),
});


export const pots = pgTable("pots", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  target: integer("target").notNull(),
  theme: varchar("theme", { length: 50 }).notNull().unique(),
});

export const budgetsRelations = relations(budgets, ({ many }) => ({
  transactions: many(transactions),
}));
