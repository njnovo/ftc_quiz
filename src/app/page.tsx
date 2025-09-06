import { Leaderboard } from "~/app/_components/leaderboard";
import { Quiz } from "~/app/_components/quiz";
import { HydrateClient } from "~/trpc/server";

export default function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              FIRST Robotics Quiz
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Test your knowledge of FIRST Tech Challenge rules and regulations. 
              Complete the quiz and see how you rank on the leaderboard!
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Leaderboard */}
            <Leaderboard />
            
            {/* Quiz */}
            <Quiz />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
