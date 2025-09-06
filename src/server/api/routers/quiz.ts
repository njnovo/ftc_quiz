import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  getLeaderboard: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(10) }))
    .query(async ({ ctx, input }) => {
      const scores = await ctx.db.quizScore.findMany({
        orderBy: [
          { score: "desc" },
          { createdAt: "asc" }
        ],
        take: input.limit,
        select: {
          id: true,
          name: true,
          score: true,
          total: true,
          createdAt: true,
        },
      });

      return scores;
    }),

  submitScore: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(50),
      score: z.number().min(0),
      total: z.number().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const quizScore = await ctx.db.quizScore.create({
        data: {
          name: input.name,
          score: input.score,
          total: input.total,
        },
      });

      return quizScore;
    }),
});
