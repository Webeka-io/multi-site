export type Tenant = {
  slug: string;              // identifiant interne
  domains: string[];         // domaines complets (avec et sans www)
  name: string;
  theme: { primary: string; secondary: string; font?: string };
  content: {
    heroTitle: string;
    heroSubtitle?: string;
    ctaLabel?: string;
    sections?: Array<{
      kind: "services" | "gallery" | "testimonials" | "contact";
      title?: string;
      items?: Array<{ title: string; text?: string; image?: string }>;
    }>;
  };
};

export const tenants: Tenant[] = [
  {
    slug: "webeka-fr",
    domains: ["webeka.fr", "www.webeka.fr"],
    name: "Boulangerie Marie",
    theme: { primary: "#8B5CF6", secondary: "#F59E0B" },
    content: {
      heroTitle: "Boulangerie artisanale de quartier",
      heroSubtitle: "Pains au levain, viennoiseries, café de spécialité.",
      ctaLabel: "Voir la carte",
      sections: [
        {
          kind: "services",
          title: "Nos spécialités",
          items: [
            { title: "Pain au levain", text: "Cuit sur place chaque matin" },
            { title: "Croissants", text: "Beurre AOP Charentes-Poitou" },
          ],
        },
        { kind: "contact", title: "Nous contacter" },
      ],
    },
  },
  {
    slug: "webeka-io",
    domains: ["webeka.io", "www.webeka.io"],
    name: "Coiffeur du Centre",
    theme: { primary: "#0EA5E9", secondary: "#F43F5E" },
    content: {
      heroTitle: "Votre salon au centre-ville",
      heroSubtitle: "Coupe, couleur, barbe — sur RDV.",
      ctaLabel: "Prendre RDV",
      sections: [
        {
          kind: "services",
          title: "Prestations",
          items: [
            { title: "Coupe", text: "H/F — 30 min" },
            { title: "Barbe", text: "Taille & soin" },
          ],
        },
        { kind: "contact", title: "Infos & horaires" },
      ],
    },
  },
];
