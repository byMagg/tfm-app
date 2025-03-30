const API_URL = "http://localhost:3000/api";

export async function fetchAPI({
  endpoint,
  token,
  method = "GET",
  limit,
  page,
  body,
}: {
  endpoint: string;
  token?: string;
  method?: string;
  limit?: number;
  page?: number;
  body?: any;
}) {
  try {
    const url = page
      ? `${API_URL}${endpoint}?limit=${limit}&page=${page}`
      : `${API_URL}${endpoint}`;

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token})}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!response.ok) throw new Error("No se ha podido obtener los datos");

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchAstroAPI({
  endpoint,
  method = "GET",
  body,
}: {
  endpoint: string;
  method?: string;
  body?: any;
}) {
  try {
    const response = await fetch(`http://localhost:4321/api${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("No se ha podido obtener los datos");

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export async function fetchWikidata(endpoint: string) {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NDhiZDhmNDY4N2VkNzI4MTk5ZDA2NWQzZmQ0MjQ2ZSIsImp0aSI6IjE4NzBlNDM1YjQ1ZjUyNDYwYjUwM2Q2YmY3NWM4OGJjM2IwNDhlNTI4N2RlODUzYTI4MDZkNjJkZjU5YTExMzAxYTU5M2MwMzNiZDI3NDI2IiwiaWF0IjoxNzE1MzM0MjE5LjI5MTQxNSwibmJmIjoxNzE1MzM0MjE5LjI5MTQyLCJleHAiOjMzMjcyMjQzMDE5LjI4Mzk5LCJzdWIiOiI3NTYwNjYxMSIsImlzcyI6Imh0dHBzOi8vbWV0YS53aWtpbWVkaWEub3JnIiwicmF0ZWxpbWl0Ijp7InJlcXVlc3RzX3Blcl91bml0Ijo1MDAwLCJ1bml0IjoiSE9VUiJ9LCJzY29wZXMiOlsiYmFzaWMiLCJoaWdodm9sdW1lIl19.OXEYaFUjgfmp_4upSlV-gsHvDwZZQ41zWa-q77MxImkPRw66oTbHcIkEJb1U-SEOz57j8rZTX7bp3YYsGEGWsFJS-N8XVpO68hogorRG0151duL2EDvcwG2ouglqEvO2lu8NxHGf2F41ORrg5tQvokiZZVTsCvJzxvu95IaNlm6x_g7K_cCPIyaA7YlaXeKriMoaTAZpalC5R9bJodekXUXO64B31NRvmtV8GV3FyGRAxs31lZJWgWAOu-ty9VOrEh31537qLPuYwDcWBWW0xeM2qldKSbbGyd6rBgN1AaaSf1knM81I7vD3ZRWTlMmNQ5ROBwvZps9eByqSiHxcAb9FIV9NFL6IJAE8mNv_E-K7oFc6PXQblQHSwXhXl2KiBHpLcQUOExMOQDac1kBa6OgKVaPdQDCC3rnIAbUEw3z13aBSIJ4zE1eMvMcoxzyubkmuXoDBIn3I1oLspdvvL_vXpKJ4j36VAaq-s1mAJ8UP4HlRJFXsSlEGgcQPS4N-KknDMYfWKvxC6dJrjSyV5nWXs8xGitdHUtBVW1plXOUNPDpYwegXdBCp7xQFmAWnF0fULzkxKxG8OlOtfPF79rUm7_G4Ro2iFFNw6EJyTb-Q20q_tR3_J3UOmFoJ-m3M9EG_S8u4lI2ppGi_8kzk7N13waFNv4Y0yXnsSbEMLYU";

  console.log(endpoint);
  try {
    const response = await fetch(
      `https://www.wikidata.org/w/rest.php/wikibase/v0${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) throw new Error("No se ha podido obtener los datos");

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function parseDateString(date: number) {
  const dateString = date.toString();

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return new Date(`${year}-${month}-${day}`);
}

export async function getPlayerImage(playerId: number): Promise<string> {
  const query = `
    query GetPlayerByPlayerId {
      getPlayerByPlayerId(playerId: "${playerId}") {
          wikidata_id
        }
      }
  `;

  let imgSrc = "/images/placeholder.jpg";
  return imgSrc;

  // const data = await fetchAPI(query);
  // const player = data.getPlayerByPlayerId;

  // let imgFilename,
  //   a,
  //   b = undefined;

  // if (!player) return imgSrc;

  // const wikidata = await fetchWikidata("/entities/items/" + player.wikidata_id);

  // if (!wikidata) return imgSrc;
  // const imageObject = wikidata.statements.P18;

  // if (imageObject) {
  //   imgFilename = wikidata.statements.P18[0].value.content.replace(/ /g, "_");
  //   const imgHash = md5(imgFilename);
  //   a = imgHash.slice(0, 1);
  //   b = imgHash.slice(0, 2);
  // }

  // if (!imgFilename) return imgSrc;

  // return `https://upload.wikimedia.org/wikipedia/commons/${a}/${b}/${imgFilename}`;
}
