import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useMatch({ id }: { id: string }) {
  const query = `
      query GetMatch {
        getMatchById(matchId: "${id}") {
          _id
          tourney_id
          tourney_name
          surface
          draw_size
          tourney_level
          tourney_date
          match_num
          winner_id
          winner_seed
          winner_entry
          winner_name
          winner_hand
          winner_ht
          winner_ioc
          winner_age
          loser_id
          loser_seed
          loser_entry
          loser_name
          loser_hand
          loser_ht
          loser_ioc
          loser_age
          score
          best_of
          round
          minutes
          w_ace
          w_df
          w_svpt
          w_1stIn
          w_1stWon
          w_2ndWon
          w_SvGms
          w_bpSaved
          w_bpFaced
          l_ace
          l_df
          l_svpt
          l_1stIn
          l_1stWon
          l_2ndWon
          l_SvGms
          l_bpSaved
          l_bpFaced
          winner_rank
          winner_rank_points
          loser_rank
          loser_rank_points
          winner1_id
          winner2_id
          loser1_id
          loser2_id
          winner1_name
          winner1_hand
          winner1_ht
          winner1_ioc
          winner1_age
          winner2_name
          winner2_hand
          winner2_ht
          winner2_ioc
          winner2_age
          loser1_name
          loser1_hand
          loser1_ht
          loser1_ioc
          loser1_age
          loser2_name
          loser2_hand
          loser2_ht
          loser2_ioc
          loser2_age
          winner1_rank
          winner1_rank_points
          winner2_rank
          winner2_rank_points
          loser1_rank
          loser1_rank_points
          loser2_rank
          loser2_rank_points
        }
      }
  `;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getMatch } = apiData;
      setMatch(getMatch);
      setLoading(false);
    };
    fetch();
  }, []);

  return { match, loading };
}
