import { pgTable, uuid, varchar, numeric, timestamp, pgEnum, boolean} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const transactionType = pgEnum("transaction_type", ["income", "expense"]);

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  avatar: varchar("avatar", { length: 255 }),
  category: varchar("category", { length: 100 }).notNull(),
  type: transactionType("type").notNull(),
  amount: numeric("amount").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  recurring: boolean("recurring").default(false).notNull(),
});

export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  category: varchar("category", { length: 100 }).notNull().unique(),
  maximum: numeric("maximum").notNull(),
  theme: varchar("theme", { length: 50 }).notNull(),
});


export const pots = pgTable("pots", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  target: numeric("target").notNull(),
  total: numeric("total").notNull(),
  theme: varchar("theme", { length: 50 }).notNull().unique(),
});

export const budgetsRelations = relations(budgets, ({ many }) => ({
  transactions: many(transactions),
}));
