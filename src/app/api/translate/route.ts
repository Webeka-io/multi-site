// app/api/translate/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST { texts: string[], to?: string }
// -> { map: Record<original, translated> }
export async function POST(req: NextRequest) {
  try {
    const { texts, to = "fr" } = await req.json();
    if (!Array.isArray(texts) || texts.length === 0) {
      return Response.json({ map: {} });
    }

    const key = process.env.DEEPL_API_KEY;
    if (!key) {
      return new Response("Missing DEEPL_API_KEY", { status: 500 });
    }

    // DeepL Free: https://api-free.deepl.com/v2/translate
    // DeepL Pro:  https://api.deepl.com/v2/translate
    const endpoint =
      process.env.DEEPL_API_ENDPOINT ||
      "https://api-free.deepl.com/v2/translate";

    // Dé-duplication côté serveur par sécurité
    const unique = Array.from(new Set(texts.filter(Boolean)));

    const params = new URLSearchParams();
    params.set("target_lang", to.toUpperCase());
    for (const t of unique) params.append("text", t);

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!resp.ok) {
      const err = await resp.text();
      return new Response(`DeepL error: ${err}`, { status: 502 });
    }

    const data: any = await resp.json();
    const out: Record<string, string> = {};
    for (let i = 0; i < unique.length; i++) {
      const src = unique[i];
      const translated = data.translations?.[i]?.text ?? src;
      out[src] = translated;
    }

    return Response.json({ map: out }, { headers: { "cache-control": "no-store" } });
  } catch (e: any) {
    return new Response(`Translate failed: ${e?.message || e}`, { status: 500 });
  }
}
