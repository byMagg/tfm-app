import { useLeagueMatch } from "@/hooks/useLeagueMatch";
import { sessionCookie } from "@/stores/session";
import type { IJwtPayload, LeagueMatch } from "@/types";
import { useStore } from "@nanostores/react";
import { jwtDecode } from "jwt-decode";
import { CalendarForm } from "./CalendarForm";
import { Chat } from "./Chat";
import { Score } from "./Score";

export const Match = ({ match }: { match: LeagueMatch }) => {
  return (
    match && (
      <div>
        <div
          className="my-2 w-fit bg-white px-4 py-2 rounded text-black text-center font-semibold text-2xl"
          style={{ viewTransitionName: `match-${match._id}` }}
        >
          {match.player1 && match.player1.name} vs{" "}
          {match.player2 && match.player2.name}
        </div>

        {match && !match.winner && (
          <div>
            <p>Aún no se ha disputado el partido</p>
            <Score match={match} />
          </div>
        )}
        {match && match.winner && (
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
        <div className="my-5">
          {match && (
            <CalendarForm
              matchId={match._id}
              maxDate={new Date(match.round.endDate)}
            />
          )}
        </div>
      </div>
    )
  );
};

export const MatchContainer = ({ id }: { id: string }) => {
  const { match, loading, error } = useLeagueMatch({ id });
  const session = useStore(sessionCookie);

  if (!match || !session) return null;

  const { user_id }: IJwtPayload = jwtDecode(session);

  const to = match.player1._id === user_id ? match.player2 : match.player1;
  const from = match.player1._id === user_id ? match.player1 : match.player2;

  return (
    <>
      <div className="w-1/2">
        <Match match={match} />
      </div>
      <div className="w-1/2">
        <Chat from={from} to={to} />
      </div>
    </>
  );
};
