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
      if (error.cause instanceof Error) {
        console.error(error.cause.code);
      }
    }
  }
}
