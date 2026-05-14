import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  QrCode,
  CreditCard,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logoReceitas from "@/assets/logo-receitas.png";
import { useSeo } from "@/lib/seo";

const PIX_KEY = "contato@receitas.site";
const CHECKOUT_URL = "https://pay.infinitepay.io/zellomed/VC1DLTItSQ-2Z2zPWDEXL-29,00";

const Pagamento = () => {
  useSeo({
    title: "Pagamento | receitas.site",
    description:
      "Finalize seu pedido no receitas.site com PIX (aprovação imediata) ou cartão de crédito de forma segura.",
    canonical: "https://receitas.site/pagamento",
    jsonLdId: "ld-pagamento",
  });
  const [tab, setTab] = useState<"pix" | "cartao">("pix");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    toast.success("Chave PIX copiada!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-[#0F1115]/70">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors w-20">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
          <Link to="/" className="flex items-center justify-center flex-1">
            <img src={logoReceitas} alt="Receitas.site" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center justify-end gap-1.5 text-xs text-emerald-400 w-20">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Seguro</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 px-6 py-10 sm:py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40"
          >
            <h1 className="text-2xl font-semibold tracking-tight text-center mb-6">
              Finalizar Pagamento
            </h1>

            {/* Product summary */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Renovação de Receita</p>
                <p className="text-xs text-white/60">Teleconsulta + Receita Digital</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-white tracking-tight">R$ 29,00</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-white/[0.04] border border-white/10 rounded-xl mb-5">
              <button
                onClick={() => setTab("pix")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === "pix"
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <QrCode className="w-4 h-4" />
                PIX
              </button>
              <button
                onClick={() => setTab("cartao")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === "cartao"
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Cartão de Crédito
              </button>
            </div>

            {/* Tab content */}
            {tab === "pix" ? (
              <motion.div
                key="pix"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-emerald-300">
                  <QrCode className="w-4 h-4 shrink-0" />
                  Liberação imediata via Pix
                </div>

                <div>
                  <label className="text-xs font-medium text-white/60 mb-2 block">
                    Chave PIX (E-mail)
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white/90 truncate">
                      {PIX_KEY}
                    </div>
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-white rounded-xl px-4"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-xs text-white/60 leading-relaxed">
                  Após o pagamento, envie o comprovante para nossa secretaria no WhatsApp para confirmação.
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cartao"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-emerald-300">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Ambiente seguro. Você será redirecionado para o checkout.</span>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-6 text-base font-semibold shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5 transition-all"
                >
                  <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="w-5 h-5" />
                    Pagar R$ 29,00 com Cartão
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-white/40 pt-2">
                  <span>Visa</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Mastercard</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Amex</span>
                </div>
              </motion.div>
            )}

            {/* Footer trust */}
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-6 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Pagamento Seguro
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Dados Criptografados
              </div>
            </div>
          </motion.div>

          <p className="text-center text-xs text-white/40 mt-6">
            Reembolso integral se o médico não aprovar a renovação.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Pagamento;
