export type Business = {
  entreprise: string
  ville: string
  secteur?: string
};

// "barberia-lille-coiffure" -> { entreprise:"Barberia", ville:"Lille", secteur:"Coiffure" }
export function parseSlug(raw: string): Business {
  const slug = decodeURIComponent((raw || "").trim());
  const [entrepriseRaw = "", villeRaw = "", secteurRaw = ""] = slug.split("-");

  return {
    entreprise: capitalize(entrepriseRaw.replace(/\s+/g, " ")),
    ville: capitalize(villeRaw.replace(/\s+/g, " ")),
    secteur: secteurRaw ? capitalize(secteurRaw.replace(/\s+/g, " ")) : undefined,
  };
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
