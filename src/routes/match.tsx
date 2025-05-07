import { useAuth } from "@/context/AuthContext";
import { getPlayerImage } from "@/controllers";
import { useMatch } from "@/hooks/useMatch";
import { Country } from "@/types";
import { parseDateString } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();

  const { match } = useMatch({ id });

  const [winnerImg, setWinnerImg] = useState<string>();
  const [loserImg, setLoserImg] = useState<string>();

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!match) return;

      setWinnerImg(await getPlayerImage({ playerId: match.winner_id, token }));
      setLoserImg(await getPlayerImage({ playerId: match.loser_id, token }));
    };
    fetch();
  }, [match, token]);

  return (
    <>
      {match && (
        <section>
          <article className="flex justify-center gap-6 items-center">
            <div className="flex flex-col items-center">
              <img
                className="object-cover h-52 w-52"
                src={winnerImg}
                alt={match.winner_name}
                width={200}
                height={200}
              />
              <h2>{match.winner_name}</h2>
              <img
                className="h-8 w-8"
                src={`/svgs/${Country[match.winner_ioc as keyof typeof Country]}.svg`}
                alt={match.winner_ioc}
                width={32}
                height={32}
              />
            </div>
            <img
              className="h-8 w-8"
              src="/svgs/versus.svg"
              alt="vs"
              width={32}
              height={32}
            />
            <div className="flex flex-col items-center">
              <img
                className="object-cover h-52 w-52"
                src={loserImg}
                alt={match.loser_name}
                width={200}
                height={200}
              />
              <h2>{match.loser_name}</h2>
              <img
                className="h-8 w-8"
                src={`/svgs/${Country[match.loser_ioc as keyof typeof Country]}.svg`}
                alt={match.loser_ioc}
                width={32}
                height={32}
              />
            </div>
          </article>
          <article className="flex flex-col items-center">
            <p>{match.score}</p>
            <p>{match.tourney_name}</p>
            {match && match.tourney_date && (
              <p>{parseDateString(match.tourney_date)?.toLocaleDateString()}</p>
            )}
            <p>{match.surface}</p>
            <p>{match.tourney_level}</p>
            <p>{match.round}</p>
          </article>
        </section>
      )}
    </>
  );
}
