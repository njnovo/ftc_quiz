"use client";

import { api } from "~/trpc/react";

export function Leaderboard() {
  const { data: scores, isLoading } = api.quiz.getLeaderboard.useQuery({ limit: 10 });

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">🏆 Leaderboard</h2>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/20 h-12 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">🏆 Leaderboard</h2>
      
      {!scores || scores.length === 0 ? (
        <div className="text-center text-white/70 py-8">
          No scores yet. Be the first to take the quiz!
        </div>
      ) : (
        <div className="space-y-3">
          {scores.map((score, index) => (
            <div
              key={score.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30"
                  : index === 1
                  ? "bg-gradient-to-r from-gray-300/20 to-gray-500/20 border border-gray-300/30"
                  : index === 2
                  ? "bg-gradient-to-r from-orange-400/20 to-orange-600/20 border border-orange-400/30"
                  : "bg-white/10 border border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                </div>
                <div>
                  <div className="font-semibold text-white">{score.name}</div>
                  <div className="text-sm text-white/70">
                    {new Date(score.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  {score.score}/{score.total}
                </div>
                <div className="text-sm text-white/70">
                  {Math.round((score.score / score.total) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
