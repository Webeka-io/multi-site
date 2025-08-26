// ⬅️ Ce fichier doit CONTENIR des "export", sinon "n'est pas un module"
export type TemplateId = "bakery-simple" | "salon-modern";

export type TenantContent = {
  heroTitle: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  sections?: Array<{
    kind: "services" | "gallery" | "testimonials" | "contact";
    title?: string;
    items?: Array<{ title: string; text?: string; image?: string }>;
  }>;
};



export type Tenant = {
  slug: string;
  domains: string[];
  name: string;
  template: TemplateId;
  content: TenantContent;

   theme: {
    primary: string;
    secondary: string;
    bg?: string;
    surface?: string;
    border?: string;
    text?: string;
    radius?: string;
  };

};

