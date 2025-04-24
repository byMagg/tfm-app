import { Chat, ChatSkeleton } from "@/components/Chat";
import { Match, MatchSkeleton } from "@/components/Match";
import { useAuth } from "@/context/AuthContext";
import { useLeagueMatch } from "@/hooks/useLeagueMatch";
import { useParams } from "react-router";

export default function LeagueMatchPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { match, loading } = useLeagueMatch({ id });

  if (loading) {
    return (
      <div className="flex">
        <div className="w-1/2">
          <MatchSkeleton />
        </div>
        <div className="w-1/2">
          <ChatSkeleton />
        </div>
      </div>
    );
  }

  if (!match) return null;

  const to = match.player1._id === user?.uid ? match.player2 : match.player1;
  const from = match.player1._id === user?.uid ? match.player1 : match.player2;

  return (
    <div className="flex">
      <div className="w-1/2">
        <Match match={match} />
      </div>
      <div className="w-1/2">
        <Chat from={from} to={to} />
      </div>
    </div>
  );
}
