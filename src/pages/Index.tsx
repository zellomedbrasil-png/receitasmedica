import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ComoFunciona from "@/components/landing/ComoFunciona";
import ProvaSocial from "@/components/landing/ProvaSocial";
import CriteriosAtendimento from "@/components/landing/CriteriosAtendimento";
import Precos from "@/components/landing/Precos";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="scroll-smooth">
      <Header />
      <main>
        <Hero />
        <ComoFunciona />
        <ProvaSocial />
        <CriteriosAtendimento />
        <Precos />
        <FAQ />
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "receitas.site",
            description: "Serviço de renovação de receitas médicas via telemedicina com receita digital válida em todo o Brasil.",
            url: "https://receitas.site",
            medicalSpecialty: "Telemedicina",
            availableService: {
              "@type": "MedicalProcedure",
              name: "Renovação de Receita Médica Digital",
              description: "Teleconsulta para renovação de receitas de uso contínuo com emissão de receita digital assinada com certificado ICP-Brasil.",
            },
            areaServed: { "@type": "Country", name: "Brasil" },
          }),
        }}
      />
    </div>
  );
};

export default Index;
