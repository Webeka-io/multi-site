import type { Tenant } from "@/lib/types";
import Header1 from "@/app/(project)/templates/layout/header/header-1";
import Image from "next/image";
import { Button } from "@/app/components/ui/button"
import { Plus } from "lucide-react"
import PricingPage from "../../sections/pricing/princing-1";
import { OpeningHoursNavbarNeumorphic } from "../../widgets/opening-hour/components/opening-hours-navbar-neumorphic";

export const routes = [""] as const; // ⬅️ mono-page

export function Layout({ children, tenant }: { children: React.ReactNode; tenant: Tenant }) {
  return (
    <div className="">
      <header className="">
        <Header1/>
      </header>
      {children}
      <footer className="mt-10 opacity-70">© {tenant.name}</footer>
    </div>
  );
}

// ex. bakery-simple
export function Page({ tenant }: { tenant: Tenant }) {
  return (
    <>
     


<PricingPage/>

<OpeningHoursNavbarNeumorphic/>

      <section id="services" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="card">
          <h3 className="font-semibold mb-1">Pain au levain</h3>
          <p className="opacity-80">Cuit chaque matin</p>

          <Button variant="default">
              <Plus />
              Default Button
            </Button>

        </article>
        {/* … */}
      </section>

      <section id="contact" className="mt-12 card">
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        {/* … */}
      </section>
    </>
  );
}
