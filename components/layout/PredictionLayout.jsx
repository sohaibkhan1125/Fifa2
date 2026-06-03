import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

/**
 * Shared layout for all prediction tools.
 * Future tools (World Cup Winner, Best Young Player, etc.) reuse this
 * to keep the PrimeTools ecosystem consistent.
 */
export default function PredictionLayout({ children, breadcrumbs }) {
  return (
    <>
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="space-y-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
