import type { Tenant } from "./types";

export const tenants = [
  {
    slug: "webeka-fr",
    domains: ["webeka.fr", "www.webeka.fr"],
    name: "Boulangerie Marie",
    template: "bakery-simple",
    theme: { primary: "#8B5CF6", secondary: "#F59E0B" },
    content: {
      heroTitle: "Boulangerie artisanale de quartier",
      heroSubtitle: "Pains au levain, viennoiseries, café de spécialité.",
      ctaLabel: "Voir la carte",
    },
  },
  {
    slug: "webeka-io",
    domains: ["webeka.io", "www.webeka.io"],
    name: "Coiffeur du Centre",
    template: "salon-modern",
    theme: { primary: "#0EA5E9", secondary: "#F43F5E" },
    content: {
      heroTitle: "Votre salon au centre-ville",
      heroSubtitle: "Coupe, couleur, barbe — sur RDV.",
      ctaLabel: "Prendre RDV",
    },
  },
] satisfies ReadonlyArray<Tenant>;
