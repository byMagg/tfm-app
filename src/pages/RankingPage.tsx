import { useRanking } from "@/hooks/useRanking";
import { useParams } from "react-router";

export default function RankingPage() {
  const { id = "" } = useParams<{ id: string }>();

  const { ranking } = useRanking({ id });

  return (
    <>
      <pre>{JSON.stringify(ranking, null, 2)}</pre>
    </>
  );
}
