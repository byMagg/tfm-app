import { useRound } from "@/hooks/useRound";
import { useEffect, useState } from "react";
import { CardStack, type Card } from "./ui/card-stack";
import { Spinner } from "./ui/spinner";
export const PlayersStack = ({ leagueId }: { leagueId: string }) => {
  const { round, loading, error } = useRound({ leagueId });

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (round) {
      const tempCards = [
        {
          id: 0,
          name: "Grupo 1",
          designation: "Senior Software Engineer",
          content: (
            <ul>
              {Object.entries(round.standings).map(
                ([playerId, score], index) => (
                  <li key={playerId} className="flex justify-between">
                    <div>
                      <strong>{index + 1}</strong>
                      <span>{playerId}</span>
                    </div>
                    <span>{score}</span>
                  </li>
                ),
              )}
            </ul>
          ),
        },
        {
          id: 1,
          name: "Grupo 2",
          designation: "Senior Software Engineer",
          content: (
            <ul>
              {Object.entries(round.standings).map(
                ([playerId, score], index) => (
                  <li key={playerId} className="flex justify-between">
                    <div>
                      <strong>{index + 1}</strong>
                      <span>{playerId}</span>
                    </div>
                    <span>{score}</span>
                  </li>
                ),
              )}
            </ul>
          ),
        },
        {
          id: 2,
          name: "Grupo 3",
          designation: "Senior Software Engineer",
          content: (
            <ul>
              {Object.entries(round.standings).map(
                ([playerId, score], index) => (
                  <li key={playerId} className="flex justify-between">
                    <div>
                      <strong>{index + 1}</strong>
                      <span>{playerId}</span>
                    </div>
                    <span>{score}</span>
                  </li>
                ),
              )}
            </ul>
          ),
        },
      ];

      setCards(tempCards);
    }
  }, [round]);

  return (
    <div className="w-full justify-center items-center flex min-h-48">
      {loading && <Spinner size="lg" className="bg-black dark:bg-white" />}
      {cards.length > 0 && <CardStack items={cards} />}
    </div>
  );
};
