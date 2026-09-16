export type GoogleReview = {
  name: string;
  stars: number;
  text: string;
  relativeTime: string;
  avatarUrl?: string;
};

type PlacesApiReview = {
  rating: number;
  text?: { text: string };
  authorAttribution?: { displayName: string; photoUri?: string };
  relativePublishTimeDescription: string;
};

// Fetches the business's live Google reviews via the Places API (New).
// Returns null (rather than throwing) whenever reviews aren't available,
// so callers can fall back to placeholder content.
export async function getGoogleReviews(): Promise<GoogleReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
      // Reviews change rarely — avoid re-billing this call on every request.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Google Places API error:", res.status, await res.text());
      return null;
    }

    const data: { reviews?: PlacesApiReview[] } = await res.json();

    if (!data.reviews || data.reviews.length === 0) {
      return null;
    }

    return data.reviews.map(r => ({
      name: r.authorAttribution?.displayName ?? "Google User",
      stars: r.rating,
      text: r.text?.text ?? "",
      relativeTime: r.relativePublishTimeDescription,
      avatarUrl: r.authorAttribution?.photoUri,
    }));
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return null;
  }
}
