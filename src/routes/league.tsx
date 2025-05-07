import AddPlayersForm from "@/components/AddPlayersForm";
import { GroupCards } from "@/components/GroupCards";
import { HistoryMatches } from "@/components/HistoryMatches";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeague } from "@/hooks/useLeague";
import { Button } from "react-day-picker";
import { useParams } from "react-router";

export default function LeaguePage() {
  const { id } = useParams<{ id: string }>();

  const { league, loading } = useLeague({ id });

  return (
    <>
      {!loading && league && (
        <div className="flex flex-col gap-4 items-center">
          <h1
            className="font-bold text-2xl"
            // style={{ viewTransitionName: `league-${league._id}` }}
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
      )}

      <GroupCards className="mb-16 mt-8" leagueId={id} />
      <HistoryMatches className="my-10" leagueId={id} />
    </>
  );
}

const LeagueSkeleton = ({ id }: { id: string }) => {
  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <Skeleton
          style={{ viewTransitionName: `league-${id}` }}
          className="h-8 w-64"
        />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="my-16 space-y-4 w-full max-w-3xl mx-auto">
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>

      <div className="my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-md" />
        ))}
      </div>
    </>
  );
};
