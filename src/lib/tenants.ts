import type { Tenant } from "./types";

export const tenants = [
  {
    slug: "",
    domains: ["", "wwww"],
    name: "Boulangerie Marie",
    template: "bakery-simple",

     theme: {
      primary: "#8B5CF6",
      secondary: "#F59E0B",
      bg: "linear-gradient(135deg, #fdf2f8 0%, #e0f2fe 100%)",       // ← fond page (ex: orange très clair)
      surface: "#FFFFFF",  // ← fond des cartes
      border: "#F2E8E1",
      text: "#1F2937",
      radius: "16px",
    },
    
    content: {
      heroTitle: "Boulangerie artisanale de quartier",
      heroSubtitle: "Pains au levain, viennoiseries, café de spécialité.",
      ctaLabel: "Voir la carte",

      
    },
  },

  
  {
    slug: "",
    domains: ["", ""],
    name: "Coiffeur du Centre",
    template: "salon-modern",

    theme: {
      primary: "#8B5CF6",
      secondary: "#F59E0B",
      bg: "#8B5CF6",       // ← fond page (ex: orange très clair)
      surface: "#FFFFFF",  // ← fond des cartes
      border: "#F2E8E1",
      text: "#1F2937",
      radius: "16px",
    },

    content: {
      heroTitle: "Votre salon au centre-ville",
      heroSubtitle: "Coupe, couleur, barbe — sur RDV.",
      ctaLabel: "Prendre RDV",
    },

    
  },
] satisfies ReadonlyArray<Tenant>;
