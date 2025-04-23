import { ChatSkeleton } from "@/components/Chat";
import { MatchContainer } from "@/components/Match";
import { useLeagueMatch } from "@/hooks/useLeagueMatch";
import { useParams } from "react-router-dom";

export const LeagueMatchPage = () => {
  const { id = "" } = useParams<{ id: string }>();

  const { match, loading } = useLeagueMatch({ id });

  if (loading) return <ChatSkeleton />;

  if (!match) return null;

  return <MatchContainer match={match} />;
};
