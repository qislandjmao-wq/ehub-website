import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  getBossKillsBySeason,
  getTopParticipantBySeason,
  insertBossKillWithPlayers,
  hasBossKillsForSeason,
} from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // BOSS 击杀记录路由
  bossKills: router({
    /** 获取指定周目的所有 BOSS 击杀记录 */
    list: publicProcedure
      .input(z.object({ season: z.string().default("飞升者行动") }))
      .query(async ({ input }) => {
        return getBossKillsBySeason(input.season);
      }),

    /** 获取参团次数最多的玩家 */
    topParticipant: publicProcedure
      .input(z.object({ season: z.string().default("飞升者行动") }))
      .query(async ({ input }) => {
        return getTopParticipantBySeason(input.season);
      }),

    /** 初始化种子数据（如果周目尚无记录） */
    seed: publicProcedure
      .input(z.object({ season: z.string().default("飞升者行动") }))
      .mutation(async ({ input }) => {
        const alreadySeeded = await hasBossKillsForSeason(input.season);
        if (alreadySeeded) {
          return { seeded: false, message: "数据已存在，无需重复初始化" };
        }

        // 飞升者行动周目的初始 BOSS 击杀数据
        const seedData: Array<{ killedAt: Date; bossName: string; players: string[] }> = [
          { killedAt: new Date("2026-04-26T11:32:00Z"), bossName: "史莱姆王", players: ["muxuemeng", "shijuanren"] },
          { killedAt: new Date("2026-04-26T13:29:00Z"), bossName: "克苏鲁之眼", players: ["muxuemeng", "shijuanren"] },
          { killedAt: new Date("2026-04-29T09:50:00Z"), bossName: "死者之王", players: ["WeingPhonk", "Elysia0516"] },
          { killedAt: new Date("2026-04-29T15:22:00Z"), bossName: "焰魔", players: ["shijuanren"] },
          { killedAt: new Date("2026-04-29T15:30:00Z"), bossName: "下界合金巨兽", players: ["shijuanren"] },
          { killedAt: new Date("2026-04-30T12:45:00Z"), bossName: "独眼巨鹿", players: ["shijuanren"] },
          { killedAt: new Date("2026-04-30T13:00:00Z"), bossName: "末影龙", players: ["muxuemeng"] },
          { killedAt: new Date("2026-04-30T14:10:00Z"), bossName: "克苏鲁之脑", players: ["ercishichang", "ChongYue_WoWu", "muxuemeng"] },
          { killedAt: new Date("2026-04-30T14:20:00Z"), bossName: "咏翼灵骸", players: ["ChongYue_WoWu", "muxuemeng", "ercishichang", "shijuanren"] },
          { killedAt: new Date("2026-05-01T12:17:00Z"), bossName: "乌姆纳塔", players: ["shijuanren"] },
          { killedAt: new Date("2026-05-02T08:18:00Z"), bossName: "受火者", players: ["shijuanren"] },
          { killedAt: new Date("2026-05-03T09:11:00Z"), bossName: "先驱者", players: ["muxuemeng", "shijuanren"] },
        ];

        for (const item of seedData) {
          await insertBossKillWithPlayers(
            { killedAt: item.killedAt, bossName: item.bossName, season: input.season },
            item.players
          );
        }

        return { seeded: true, message: `成功初始化 ${seedData.length} 条记录` };
      }),
  }),
});

export type AppRouter = typeof appRouter;
