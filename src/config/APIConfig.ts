export const serverPageFetchRequest = async (
  route: string,
  revalidationValue: number = 0,
) => {
  const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (!route) {
    console.warn("[serverPageFetchRequest] No route provided.");
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/${route}`, {
      next: {
        revalidate: revalidationValue * 3600
      },
    });
    if (!res.ok) {
      console?.error(
        `[serverPageFetchRequest] Fetch failed with status ${res.status}: ${res.statusText}`
        , res);
      return null;
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.error(
      `[serverPageFetchRequest] Error fetching route ${route}:`,
      error
    );
    return null;
  }
};