async function fetchJson(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Server-Fehler: " + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
