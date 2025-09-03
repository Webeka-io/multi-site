// app/api/translate/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetLang = (searchParams.get("tl") || "fr").toUpperCase();
  const debug = searchParams.get("debug") === "1";

  const body = await req.json().catch(() => ({}));
  const strings: string[] = Array.isArray(body?.strings) ? body.strings : [];

  const apiKey = process.env.DEEPL_API_KEY || "";
  const base = (process.env.DEEPL_API_BASE || "https://api-free.deepl.com").replace(/\/+$/, "");
  const endpoint = `${base}/v2/translate`;

  if (strings.length === 0) {
    return Response.json({ translations: [] });
  }

  // Sans clé → renvoie inchangé (évite de casser l’affichage)
  if (!apiKey) {
    return Response.json({
      translations: strings,
      ...(debug ? { debug: { hasKey: false, endpoint } } : {}),
    });
  }

  // Corps x-www-form-urlencoded avec auth_key (pas de header Authorization)
  const params = new URLSearchParams();
  for (const s of strings) params.append("text", s);
  params.set("target_lang", targetLang);
  params.set("preserve_formatting", "1");
  params.set("split_sentences", "1");
  params.set("auth_key", apiKey); // ⬅️ clé ici

  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const raw = await upstream.text().catch(() => "");
  if (!upstream.ok) {
    // renvoie une erreur claire pour debug prod
    return new Response(
      JSON.stringify({
        error: "DeepL request failed",
        status: upstream.status,
        body: raw.slice(0, 500),
        endpoint,
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let json: any = null;
  try { json = JSON.parse(raw); } catch { /* ignore */ }

  const translations: string[] = Array.isArray(json?.translations)
    ? json.translations.map((t: any) => String(t.text ?? ""))
    : strings;

  return Response.json({
    translations,
    ...(debug ? { debug: { hasKey: true, endpoint } } : {}),
  });
}
