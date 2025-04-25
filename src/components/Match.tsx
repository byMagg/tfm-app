import type { LeagueMatch } from "@/types";
import { CalendarForm } from "./CalendarForm";
import { Score } from "./Score";
import { Skeleton } from "./ui/skeleton";

export const Match = ({ match }: { match: LeagueMatch }) => {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <div
        className="my-2 w-fit bg-white px-4 py-2 rounded text-black text-center font-semibold text-2xl"
        style={{ viewTransitionName: `match-${match._id}` }}
      >
        {match.player1.name} vs {match.player2.name}
      </div>

      <div className="py-2">
        {match.winner && (
          <>
            <p>
              El ganador es{" "}
              {match.winner === match.player1._id
                ? match.player1.name
                : match.player2.name}
            </p>
            <span>{match.score}</span>
          </>
        )}

        {!match.winner && (
          <>
            <p>Aún no se ha disputado el partido</p>
            <Score match={match} />
          </>
        )}
      </div>

      <div className="my-5">
        <CalendarForm
          matchId={match._id}
          maxDate={new Date(match.round.endDate)}
        />
      </div>
    </div>
  );
};

export const MatchSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-60 rounded-md" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-24 w-72" />
      </div>

      <Skeleton className="h-4 w-32" />
    </div>
  );
};
