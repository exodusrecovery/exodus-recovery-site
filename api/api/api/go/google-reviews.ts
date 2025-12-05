import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  if (!API_KEY || !PLACE_ID) {
    return res.status(500).json({ error: { message: "Google API key or Place ID not configured" } });
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${encodeURIComponent(PLACE_ID)}` +
      `&fields=name,rating,user_ratings_total,reviews` +
      `&key=${API_KEY}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`Google Places error: ${resp.status} ${txt}`);
    }

    const data = await resp.json();

    if (data.status !== "OK") {
      throw new Error(data.error_message || `Google Places status: ${data.status}`);
    }

    const result = data.result || {};
    const reviews = (result.reviews || []).slice(0, 5).map((r: any) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      relative_time_description: r.relative_time_description,
      profile_photo_url: r.profile_photo_url,
    }));

    return res.status(200).json({
      place_name: result.name,
      rating: result.rating,
      total: result.user_ratings_total,
      reviews,
    });
  } catch (err: any) {
    console.error("Google reviews error:", err);
    return res.status(500).json({ error: { message: err?.message || "Failed to load Google reviews" } });
  }
}