import { useCheckPlayerInLeague } from "@/hooks/useCheckPlayerInLeague";
import type { League, LeagueMatch } from "@/types";

export const ProfileMatches = () => {
  const { leagues, loading, error } = useCheckPlayerInLeague();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    leagues &&
    leagues.map((league: League) => (
      <section
        key={league._id}
        className="w-full flex flex-col justify-center items-center my-3"
      >
        <p className="text-center font-bold text-2xl">{league.name}</p>

        <article className="w-full flex flex-col justify-center items-center my-3">
          <h2 className="text-center  text-xl">Partidos esta jornada</h2>
          <ul>
            {league.matches?.map((match: LeagueMatch) => (
              <li
                key={match._id}
                className="my-2 bg-white p-2 rounded text-black text-center font-semibold"
              >
                <a
                  href={`/league-matches/${match._id}`}
                  style={{
                    viewTransitionName: `match-${match._id}`,
                  }}
                >
                  {match.player1.name}
                  vs
                  {match.player2.name}
                </a>
                <span>{match.score}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    ))
  );
};
