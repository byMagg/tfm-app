import { useRound } from "@/hooks/useRound";
import { useEffect, useState } from "react";
import { CardStack, type Card } from "./ui/card-stack";
import { Spinner } from "./ui/spinner";
export const PlayersStack = ({
  leagueId,
  className,
}: {
  leagueId: string;
  className?: string;
}) => {
  const { round, loading, error } = useRound({ leagueId });

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (round) {
      const tempCards = [
        {
          id: 0,
          name: "Grupo 1",
          content: (
            <ul>
              {round.standings.map(({ player, points }, index) => (
                <li key={player._id} className="flex justify-between">
                  <div className="flex gap-1">
                    <strong>{index + 1}</strong>
                    <span>{player.name}</span>
                  </div>
                  <span>{points}</span>
                </li>
              ))}
            </ul>
          ),
        },
        {
          id: 1,
          name: "Grupo 2",
          content: (
            <ul>
              {round.standings.map(({ player, points }, index) => (
                <li key={player._id} className="flex justify-between">
                  <div className="flex gap-1">
                    <strong>{index + 1}</strong>
                    <span>{player.name}</span>
                  </div>
                  <span>{points}</span>
                </li>
              ))}
            </ul>
          ),
        },
        {
          id: 2,
          name: "Grupo 3",
          content: (
            <ul>
              {round.standings.map(({ player, points }, index) => (
                <li key={player._id} className="flex justify-between">
                  <div className="flex gap-1">
                    <strong>{index + 1}</strong>
                    <span>{player.name}</span>
                  </div>
                  <span>{points}</span>
                </li>
              ))}
            </ul>
          ),
        },
      ];

      setCards(tempCards);
    }
  }, [round]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${className}`}
    >
      {loading && <Spinner size="lg" className="bg-black dark:bg-white" />}
      {cards.length > 0 && <CardStack items={cards} />}
    </div>
  );
};
