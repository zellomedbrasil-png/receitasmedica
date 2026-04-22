import { useEffect } from "react";
import HeaderVB from "@/components/landing-vb/HeaderVB";
import HeroVB from "@/components/landing-vb/HeroVB";
import DorVB from "@/components/landing-vb/DorVB";
import ComoFuncionaVB from "@/components/landing-vb/ComoFuncionaVB";
import DiferencialEticoVB from "@/components/landing-vb/DiferencialEticoVB";
import PrecosVB from "@/components/landing-vb/PrecosVB";
import TransparenciaVB from "@/components/landing-vb/TransparenciaVB";
import GarantiaVB from "@/components/landing-vb/GarantiaVB";
import FaqVB from "@/components/landing-vb/FaqVB";
import CtaFinalVB from "@/components/landing-vb/CtaFinalVB";
import FooterVB from "@/components/landing-vb/FooterVB";

const PAGE_TITLE =
  "Renove sua receita médica em até 1 hora | receitas.site";
const PAGE_DESCRIPTION =
  "Médicos com CRM ativo, prescrição pelo princípio ativo e receita digital ICP-Brasil válida em qualquer farmácia. Plano Tranquilo R$ 47/mês ou Avulsa R$ 59.";
const PAGE_URL = "https://receitas.site/v-b";

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.replace(/[\[\]"]/g, "").split("=");
    el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  return el;
};

const IndexVB = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const created: HTMLElement[] = [];

    const ensure = (selector: string, build: () => HTMLElement) => {
      let el = document.head.querySelector<HTMLElement>(selector);
      if (!el) {
        el = build();
        document.head.appendChild(el);
        created.push(el);
      }
      return el;
    };

    // ab-variant marker
    const ab = ensure('meta[name="ab-variant"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "ab-variant");
      return m;
    });
    ab.setAttribute("content", "B");

    // description
    const desc = ensure('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    const prevDesc = desc.getAttribute("content");
    desc.setAttribute("content", PAGE_DESCRIPTION);

    // canonical
    const canonical = ensure('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    }) as HTMLLinkElement;
    const prevCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", PAGE_URL);

    // OG tags
    const ogTitle = setMeta('meta[property="og:title"]', "content", PAGE_TITLE);
    ogTitle.setAttribute("property", "og:title");
    const ogDesc = setMeta('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
    ogDesc.setAttribute("property", "og:description");
    const ogUrl = setMeta('meta[property="og:url"]', "content", PAGE_URL);
    ogUrl.setAttribute("property", "og:url");
    const ogType = setMeta('meta[property="og:type"]', "content", "website");
    ogType.setAttribute("property", "og:type");

    // JSON-LD
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "receitas.site",
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      medicalSpecialty: "GeneralPractice",
      priceRange: "R$ 47 - R$ 59",
      offers: [
        {
          "@type": "Offer",
          name: "Consulta Avulsa",
          price: "59.00",
          priceCurrency: "BRL",
        },
        {
          "@type": "Offer",
          name: "Plano Tranquilo",
          price: "47.00",
          priceCurrency: "BRL",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "47.00",
            priceCurrency: "BRL",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
        },
      ],
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      if (prevDesc) desc.setAttribute("content", prevDesc);
      if (prevCanonical) canonical.setAttribute("href", prevCanonical);
      created.forEach((el) => el.remove());
      ld.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <HeaderVB />
      <main>
        <HeroVB />
        <DorVB />
        <ComoFuncionaVB />
        <DiferencialEticoVB />
        <PrecosVB />
        <TransparenciaVB />
        <GarantiaVB />
        <FaqVB />
        <CtaFinalVB />
      </main>
      <FooterVB />
    </div>
  );
};

export default IndexVB;
