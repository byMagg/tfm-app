import { useAuth } from "@/context/AuthContext";
import { getPlayerImage } from "@/controllers";
import { usePlayer } from "@/hooks/usePlayer";
import { Country } from "@/types";
import {} from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();

  const { player } = usePlayer({ id });

  const [imgSrc, setImgSrc] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!player) return;
      setImgSrc(
        await getPlayerImage({ playerId: player.player_id ?? 0, token }),
      );
    };

    fetch();
  }, [player, token]);

  return (
    <>
      {imgSrc && <img src={imgSrc} alt="player" width="200" height="200" />}

      {player && (
        <div>
          <h2>
            {player.name_first} {player.name_last}
          </h2>
          <p>{player.dob}</p>
          <p>{player.hand}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img
              src={`/svgs/${Country[player.ioc as keyof typeof Country]}.svg`}
              alt={player.ioc}
              height={30}
              width={30}
            />
            <p>{player.ioc}</p>
          </div>
          <p>{player.height} cm</p>
        </div>
      )}

      <pre>{JSON.stringify(player, null, 2)}</pre>
    </>
  );
}
