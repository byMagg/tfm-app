import { usePlayer } from "@/hooks/usePlayer";
import { Country } from "@/types";
import { getPlayerImage } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const PlayerPage = () => {
  const { id = "" } = useParams<{ id: string }>();

  const { player } = usePlayer({ id });

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (!player) return;
      setImgSrc(await getPlayerImage(player.player_id ?? 0));
    };

    fetch();
  }, [player]);

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
};
