import AddPlayersForm from "@/components/AddPlayersForm";
import TableUsersComponent from "@/components/TableUsersComponent";
import { useLeague } from "@/hooks/useLeague";
import { useParams } from "react-router-dom";

export const LeaguePage = () => {
  const { id = "" } = useParams<{ id: string }>();

  const { league, loading } = useLeague({ id });

  if (!league) return null;

  return (
    <>
      <AddPlayersForm leagueId={league._id} />
      <TableUsersComponent leagueId={league._id} playerIds={league.players} />
    </>
  );
};
