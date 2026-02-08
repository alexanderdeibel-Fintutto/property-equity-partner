import { useState } from 'react';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/AuthModal';
import { EKInputForm } from '@/components/eigenkapital/EKInputForm';
import { EKResultsDisplay } from '@/components/eigenkapital/EKResultsDisplay';
import { EKCrossSellBanner } from '@/components/eigenkapital/EKCrossSellBanner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ShieldCheck } from 'lucide-react';
import { useEigenkapitalCalculator } from '@/hooks/useEigenkapitalCalculator';
import { defaultEigenkapitalInputs } from '@/types/eigenkapital';
import type { EigenkapitalInputs } from '@/types/eigenkapital';
import heroBg from '@/assets/hero-gradient-bg.png';

const Eigenkapital = () => {
  const [inputs, setInputs] = useState<EigenkapitalInputs>(defaultEigenkapitalInputs);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const results = useEigenkapitalCalculator(inputs);

  const handleReset = () => {
    setInputs(defaultEigenkapitalInputs);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={() => setShowAuthModal(true)} />

      {/* Hero Section with Background Image */}
      <div
        className="relative text-white py-12 md:py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
              Professionelle Kalkulation
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            Eigenkapital-Rechner
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed">
            Berechnen Sie das benötigte Eigenkapital für Ihre Immobilieninvestition – inklusive Beleihungsauslauf und Zinsstaffelung.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-4">
            <EKInputForm inputs={inputs} onChange={setInputs} />
            
            <Button variant="outline" onClick={handleReset} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Zurücksetzen
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <EKResultsDisplay results={results} />
            <EKCrossSellBanner />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Eigenkapitalquote</div>
            <div className={`font-mono text-xl font-bold ${
              results.ek_quote >= 20 ? 'text-success' : 
              results.ek_quote >= 10 ? 'text-warning' : 'text-destructive'
            }`}>
              {results.ek_quote.toFixed(1)}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Monatliche Rate</div>
            <div className="font-mono text-lg font-semibold">
              {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(results.monatliche_rate)}
            </div>
          </div>
        </div>
      </div>

      {/* Add padding for mobile sticky footer */}
      <div className="lg:hidden h-20" />

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Eigenkapital;
