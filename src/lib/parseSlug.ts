export type Business = {
  entreprise: string;
  ville: string;
  secteur?: string;
};

// "barberia-lille-coiffure" -> { entreprise:"Barberia", ville:"Lille", secteur:"Coiffure" }
// "ma-super-entreprise-lille-coiffure" -> { entreprise:"Ma Super Entreprise", ville:"Lille", secteur:"Coiffure" }
// "ma-super-entreprise-lille" -> { entreprise:"Ma Super Entreprise", ville:"Lille" }
export function parseSlug(raw: string): Business {
  const slug = decodeURIComponent((raw || "").trim().replace(/\/+$/,"")); // drop trailing "/"
  const parts = slug
    .split("-")
    .map(p => p.trim())
    .filter(Boolean);

  // garde-fous
  if (parts.length === 0) {
    return { entreprise: "", ville: "" };
  }
  if (parts.length === 1) {
    return { entreprise: toTitle(parts[0]), ville: "" };
  }
  if (parts.length === 2) {
    const [entreprise, ville] = parts;
    return {
      entreprise: toTitle(entreprise.replace(/-/g, " ")),
      ville: toTitle(ville.replace(/-/g, " ")),
    };
  }

  // ≥ 3 segments : entreprise = tout sauf les deux derniers, ville = avant-dernier, secteur = dernier
  const entrepriseRaw = parts.slice(0, -2).join(" ");
  const villeRaw = parts.at(-2)!;
  const secteurRaw = parts.at(-1)!;

  return {
    entreprise: toTitle(entrepriseRaw),
    ville: toTitle(villeRaw),
    secteur: toTitle(secteurRaw),
  };
}

function toTitle(s: string) {
  // remplace multiples espaces, puis Title Case mot par mot
  return s
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b([a-zà-ÿ])/g, (m) => m.toUpperCase());
}
