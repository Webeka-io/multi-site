import type { TemplateId, Tenant } from "@/lib/types";
import React from "react";

export type TemplateModule = {
  routes?: readonly string[];
  Layout?: React.ComponentType<{ children: React.ReactNode; tenant: Tenant }>;
  Page: React.ComponentType<{ path: string[]; tenant: Tenant }>;
};

export const templateLoaders: Record<TemplateId, () => Promise<TemplateModule>> = {
  "bakery-simple": () => import("./sites-clients/bakery-simple"),
  "salon-modern": () => import("./sites-clients/salon-modern"),
} as const;
