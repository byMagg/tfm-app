export async function fetchAPI(query: string): Promise<any> {
  try {
    const response = await fetch('http://localhost:4321/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) throw new Error('Failed to fetch data')

    const { data } = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
