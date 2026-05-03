import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// BOSS 击杀记录表
export const bossKills = mysqlTable("boss_kills", {
  id: int("id").autoincrement().primaryKey(),
  /** 击杀发生的时间（UTC 毫秒时间戳） */
  killedAt: timestamp("killedAt").notNull(),
  /** BOSS 名称 */
  bossName: varchar("bossName", { length: 128 }).notNull(),
  /** 所属周目名称，如"飞升者行动" */
  season: varchar("season", { length: 64 }).notNull().default("飞升者行动"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BossKill = typeof bossKills.$inferSelect;
export type InsertBossKill = typeof bossKills.$inferInsert;

// 参团玩家表（每条击杀记录对应多个玩家）
export const killParticipants = mysqlTable("kill_participants", {
  id: int("id").autoincrement().primaryKey(),
  killId: int("killId").notNull(),
  playerName: varchar("playerName", { length: 64 }).notNull(),
});

export type KillParticipant = typeof killParticipants.$inferSelect;
export type InsertKillParticipant = typeof killParticipants.$inferInsert;