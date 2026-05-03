import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, InsertBossKill, InsertKillParticipant, users, bossKills, killParticipants } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== BOSS 击杀记录相关查询 =====

/** 获取指定周目的所有 BOSS 击杀记录（按时间升序） */
export async function getBossKillsBySeason(season: string) {
  const db = await getDb();
  if (!db) return [];

  const kills = await db
    .select()
    .from(bossKills)
    .where(eq(bossKills.season, season))
    .orderBy(bossKills.killedAt);

  // 为每条记录查询参团玩家
  const result = await Promise.all(
    kills.map(async (kill) => {
      const participants = await db
        .select()
        .from(killParticipants)
        .where(eq(killParticipants.killId, kill.id));
      return {
        ...kill,
        players: participants.map((p) => p.playerName),
      };
    })
  );

  return result;
}

/** 统计指定周目中参团次数最多的玩家 */
export async function getTopParticipantBySeason(season: string) {
  const db = await getDb();
  if (!db) return null;

  // 关联 boss_kills 和 kill_participants，统计每个玩家的参团次数
  const rows = await db
    .select({
      playerName: killParticipants.playerName,
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(killParticipants)
    .innerJoin(bossKills, eq(killParticipants.killId, bossKills.id))
    .where(eq(bossKills.season, season))
    .groupBy(killParticipants.playerName)
    .orderBy(sql`COUNT(*) DESC`)
    .limit(1);

  return rows.length > 0 ? rows[0] : null;
}

/** 批量插入 BOSS 击杀记录（包含参团玩家） */
export async function insertBossKillWithPlayers(
  kill: InsertBossKill,
  players: string[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(bossKills).values(kill).$returningId();
  const killId = result.id;

  if (players.length > 0) {
    await db.insert(killParticipants).values(
      players.map((playerName) => ({ killId, playerName }))
    );
  }

  return killId;
}

/** 检查指定周目是否已有数据 */
export async function hasBossKillsForSeason(season: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const rows = await db
    .select({ id: bossKills.id })
    .from(bossKills)
    .where(eq(bossKills.season, season))
    .limit(1);

  return rows.length > 0;
}
