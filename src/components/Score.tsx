import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";

const checkSetWinner = (set: { player1: number; player2: number }) => {
  if (set.player1 === 6 && set.player2 <= 4) return "player1";
  if (set.player2 === 6 && set.player1 <= 4) return "player2";
  if (set.player1 === 7 && set.player2 === 6) return "player1";
  if (set.player2 === 7 && set.player1 === 6) return "player2";
};

const checkMatchWinner = (sets: { player1: number; player2: number }[]) => {
  const player1Wins = sets.filter(
    (set) => checkSetWinner(set) === "player1",
  ).length;
  const player2Wins = sets.filter(
    (set) => checkSetWinner(set) === "player2",
  ).length;

  if (player1Wins === 2) return "player1";
  if (player2Wins === 2) return "player2";
};

const scoreSchema = z
  .object({
    player1: z.number(),
    player2: z.number(),
  })
  .refine(
    ({ player1, player2 }) => {
      const validWinBySix =
        (player1 === 6 && player2 <= 4) || (player2 === 6 && player1 <= 4);
      const validTiebreakWin =
        (player1 === 7 && player2 === 6) || (player2 === 7 && player1 === 6);
      return validWinBySix || validTiebreakWin;
    },
    { message: "Resultado inválido. Debe ser 6-0 a 6-4 o 7-6." },
  );

export function Score() {
  const [score, setScore] = useState([
    { player1: 0, player2: 0 },
    { player1: 0, player2: 0 },
    { player1: 0, player2: 0 },
  ]);

  const incrementScore = (i: number, player: "player1" | "player2") => {
    setScore((prevScore) =>
      prevScore.map((set, index) => {
        if (index !== i) return set;

        const newScore = set[player] + 1;

        if (newScore > 7) return { ...set, [player]: 0 };

        return { ...set, [player]: newScore };
      }),
    );
  };

  const validateAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = score.map((set) => {
      const parse = scoreSchema.safeParse(set);
      if (parse.success) {
        const winner = checkSetWinner(set);
        if (winner) return { success: true, winner };
      }

      return parse;
    });
    const isValid = results.every((result) => result.success);

    if (!isValid && !checkMatchWinner(score)) return;

    console.log("Submit", results);
  };

  return (
    <form onSubmit={validateAndSubmit}>
      {score.map((set, i) => (
        <div key={i} className="flex items-center justify-center space-x-4">
          <span>Set {i + 1}</span>
          <Button type="button" onClick={() => incrementScore(i, "player1")}>
            {set.player1}
          </Button>
          <Button type="button" onClick={() => incrementScore(i, "player2")}>
            {set.player2}
          </Button>
        </div>
      ))}

      <Button type="submit">Enviar</Button>
    </form>
  );
}
