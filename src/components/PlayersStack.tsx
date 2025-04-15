import { usePlayersFromLeague } from "@/hooks/usePlayersFromLeague";
import { useEffect, useState } from "react";
import { CardStack } from "./ui/card-stack";

const CARDS = [
  {
    id: 0,
    name: "Grupo 1",
    designation: "Senior Software Engineer",
    content: (
      <ul>
        <li className="flex justify-between">
          <div>
            <strong>1</strong>
            <span>Pepe</span>
          </div>
          <span>5</span>
        </li>
        <li className="flex justify-between">
          <div>
            <strong>2</strong>
            <span>Santi</span>
          </div>
          <span>3</span>
        </li>
        <li className="flex justify-between">
          <div>
            <strong>3</strong>
            <span>Diego</span>
          </div>
          <span>1</span>
        </li>
      </ul>
    ),
  },
  {
    id: 1,
    name: "Grupo 2",
    designation: "Senior Software Engineer",
    content: (
      <ul>
        <li className="flex justify-between">
          <div>
            <strong>1</strong>
            <span>Pepe</span>
          </div>
          <span>5</span>
        </li>
        <li className="flex justify-between">
          <div>
            <strong>2</strong>
            <span>Santi</span>
          </div>
          <span>3</span>
        </li>
        <li className="flex justify-between">
          <div>
            <strong>3</strong>
            <span>Diego</span>
          </div>
          <span>1</span>
        </li>
      </ul>
    ),
  },

  {
    id: 2,
    name: "Grupo 3",
    designation: "Senior Software Engineer",
    content: (
      <ul>
        <li className="flex justify-between">
          <div>
            <strong>1</strong>
            <span>Pepe</span>
          </div>
          <span>5</span>
        </li>
        <li className="flex justify-between">
          <div>
            <strong>2</strong>
            <span>Santi</span>
          </div>
          <span>3</span>
        </li>
        <li className="flex justify-between">
          <div>
            <strong>3</strong>
            <span>Diego</span>
          </div>
          <span>1</span>
        </li>
      </ul>
    ),
  },
];
export const PlayersStack = ({ playerIds }: { playerIds: string[] }) => {
  const { players, count, loading, error } = usePlayersFromLeague({
    playerIds,
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (players) {
    }
  }, [players]);

  return <CardStack items={CARDS} />;
};
