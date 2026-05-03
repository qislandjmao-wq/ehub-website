import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getBossKillsBySeason: vi.fn(),
  getTopParticipantBySeason: vi.fn(),
  insertBossKillWithPlayers: vi.fn(),
  hasBossKillsForSeason: vi.fn(),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn(),
}));

import {
  getBossKillsBySeason,
  getTopParticipantBySeason,
  hasBossKillsForSeason,
  insertBossKillWithPlayers,
} from "./db";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("bossKills.list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns kill records for the given season", async () => {
    const mockKills = [
      {
        id: 1,
        killedAt: new Date("2026-04-26T11:32:00Z"),
        bossName: "史莱姆王",
        season: "飞升者行动",
        createdAt: new Date(),
        players: ["muxuemeng", "shijuanren"],
      },
    ];
    vi.mocked(getBossKillsBySeason).mockResolvedValue(mockKills);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bossKills.list({ season: "飞升者行动" });

    expect(result).toHaveLength(1);
    expect(result[0].bossName).toBe("史莱姆王");
    expect(result[0].players).toContain("muxuemeng");
    expect(getBossKillsBySeason).toHaveBeenCalledWith("飞升者行动");
  });

  it("returns empty array when no records exist", async () => {
    vi.mocked(getBossKillsBySeason).mockResolvedValue([]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bossKills.list({ season: "飞升者行动" });

    expect(result).toHaveLength(0);
  });
});

describe("bossKills.topParticipant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the player with most participations", async () => {
    vi.mocked(getTopParticipantBySeason).mockResolvedValue({
      playerName: "shijuanren",
      count: 9,
    });

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bossKills.topParticipant({ season: "飞升者行动" });

    expect(result).not.toBeNull();
    expect(result?.playerName).toBe("shijuanren");
    expect(result?.count).toBe(9);
    expect(getTopParticipantBySeason).toHaveBeenCalledWith("飞升者行动");
  });

  it("returns null when no data exists", async () => {
    vi.mocked(getTopParticipantBySeason).mockResolvedValue(null);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bossKills.topParticipant({ season: "飞升者行动" });

    expect(result).toBeNull();
  });
});

describe("bossKills.seed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("seeds data when season has no records", async () => {
    vi.mocked(hasBossKillsForSeason).mockResolvedValue(false);
    vi.mocked(insertBossKillWithPlayers).mockResolvedValue(1);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bossKills.seed({ season: "飞升者行动" });

    expect(result.seeded).toBe(true);
    expect(result.message).toContain("成功初始化");
    expect(insertBossKillWithPlayers).toHaveBeenCalledTimes(12);
  });

  it("skips seeding when data already exists", async () => {
    vi.mocked(hasBossKillsForSeason).mockResolvedValue(true);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bossKills.seed({ season: "飞升者行动" });

    expect(result.seeded).toBe(false);
    expect(result.message).toContain("数据已存在");
    expect(insertBossKillWithPlayers).not.toHaveBeenCalled();
  });
});
