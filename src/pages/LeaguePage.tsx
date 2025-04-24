import AddPlayersForm from "@/components/AddPlayersForm";
import { GroupCards } from "@/components/GroupCards";
import { HistoryMatches } from "@/components/HistoryMatches";
import { useLeague } from "@/hooks/useLeague";
import { Button } from "react-day-picker";
import { useParams } from "react-router";

export const LeaguePage = () => {
  const { id = "" } = useParams<{ id: string }>();

  const { league, loading } = useLeague({ id });

  if (!league) return null;

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1
          className="font-bold text-2xl"
          style={{ viewTransitionName: `league-${league._id}` }}
        >
          {league.name}
        </h1>
        {league.startedAt ? (
          <h3 className="font-semibold text-xl text-green-200 ">EN JUEGO</h3>
        ) : (
          <Button>Start season</Button>
          // <form method="POST" action={actions.startSeason}>
          //   <input type="hidden" name="leagueId" value={league._id} />
          // </form>
        )}

        <AddPlayersForm leagueId={id} />
      </div>
      <GroupCards className="my-16" leagueId={id} />
      <HistoryMatches className="my-16" leagueId={id} />
    </>
  );
};
