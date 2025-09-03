// app/api/translate/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetLang = (searchParams.get("tl") || "fr").toUpperCase();
  const body = await req.json().catch(() => ({}));
  const strings: string[] = Array.isArray(body?.strings) ? body.strings : [];

  if (strings.length === 0) {
    return Response.json({ translations: [] });
  }

  const apiKey = process.env.DEEPL_API_KEY || "e4edbb79-bb31-4eaa-8db4-98f4b30843ee:fx";
  const base = (process.env.DEEPL_API_BASE || "https://api-free.deepl.com").replace(/\/+$/, "");
  const endpoint = `${base}/v2/translate`;

  // Pas de clé => renvoie tel quel (affichage identique)
  if (!apiKey) {
    return Response.json({ translations: strings });
  }

  const params = new URLSearchParams();
  for (const s of strings) params.append("text", s);
  params.set("target_lang", targetLang);
  params.set("preserve_formatting", "1");
  params.set("split_sentences", "1");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    return new Response(`Translate error: ${res.status} ${txt}`, { status: 500 });
  }

  const json = await res.json().catch(() => null);
  const translations: string[] = Array.isArray(json?.translations)
    ? json.translations.map((t: any) => String(t.text ?? ""))
    : strings;

  return Response.json({ translations });
}
