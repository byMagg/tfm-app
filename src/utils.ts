export async function fetchAPI(query: string) {
  try {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    });

    if (!response.ok) throw new Error("No se ha podido obtener los datos");

    const { data } = await response.json();
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
