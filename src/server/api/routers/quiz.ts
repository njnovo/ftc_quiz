import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  getLeaderboard: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(10) }))
    .query(async ({ ctx, input }) => {
      console.log("🏆 [tRPC] getLeaderboard called with input:", JSON.stringify(input, null, 2));
      
      try {
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

        console.log("🏆 [tRPC] getLeaderboard returning scores:", JSON.stringify(scores, null, 2));
        console.log("🏆 [tRPC] getLeaderboard count:", scores.length);
        
        return scores;
      } catch (error) {
        console.error("🏆 [tRPC] getLeaderboard error:", error);
        throw error;
      }
    }),

  submitScore: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(50),
      score: z.number().min(0),
      total: z.number().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      console.log("📝 [tRPC] submitScore called with input:", JSON.stringify(input, null, 2));
      
      try {
        const quizScore = await ctx.db.quizScore.create({
          data: {
            name: input.name,
            score: input.score,
            total: input.total,
          },
        });

        console.log("📝 [tRPC] submitScore created:", JSON.stringify(quizScore, null, 2));
        console.log("📝 [tRPC] submitScore success - Score:", `${quizScore.score}/${quizScore.total}`, "by", quizScore.name);
        
        return quizScore;
      } catch (error) {
        console.error("📝 [tRPC] submitScore error:", error);
        throw error;
      }
    }),
});
