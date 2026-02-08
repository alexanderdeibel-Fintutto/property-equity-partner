import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, AlertTriangle, TrendingUp, Percent, Euro, Home } from 'lucide-react';
import type { EigenkapitalResults } from '@/types/eigenkapital';
import { cn } from '@/lib/utils';
import heroBg from '@/assets/hero-gradient-bg.png';

interface EKResultsDisplayProps {
  results: EigenkapitalResults;
}

const empfehlungConfig = {
  kritisch: {
    icon: AlertCircle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/30',
    label: 'Kritisch',
  },
  ausreichend: {
    icon: AlertTriangle,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    label: 'Ausreichend',
  },
  gut: {
    icon: CheckCircle2,
    color: 'text-success/80',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    label: 'Gut',
  },
  sehr_gut: {
    icon: CheckCircle2,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
    label: 'Sehr gut',
  },
};

const getEKQuoteColor = (quote: number) => {
  if (quote < 10) return 'text-destructive';
  if (quote < 20) return 'text-warning';
  if (quote < 30) return 'text-success/80';
  return 'text-success';
};

const getProgressColor = (quote: number) => {
  if (quote < 10) return 'bg-destructive';
  if (quote < 20) return 'bg-warning';
  if (quote < 30) return 'bg-success/80';
  return 'bg-success';
};

export function EKResultsDisplay({ results }: EKResultsDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value) + '%';
  };

  const config = empfehlungConfig[results.empfehlung];
  const Icon = config.icon;

  return (
    <div className="space-y-4">
      {/* Primary Result Card */}
      <Card className="overflow-hidden">
        <div 
          className="p-6 text-white"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <p className="text-sm opacity-80 mb-1">Ihre Eigenkapitalquote</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-5xl font-bold text-white">
              {formatPercent(results.ek_quote)}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1 opacity-80">
              <span>0%</span>
              <span>10%</span>
              <span>20%</span>
              <span>30%+</span>
            </div>
            <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div 
                className={cn('h-full rounded-full transition-all duration-500', 
                  results.ek_quote < 10 ? 'bg-destructive' : 
                  results.ek_quote < 20 ? 'bg-warning' : 'bg-success'
                )}
                style={{ width: `${Math.min(results.ek_quote / 30 * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Empfehlungs-Box */}
      <Card className={cn('border-2', config.borderColor, config.bgColor)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', config.color)} />
            <div>
              <p className={cn('font-semibold', config.color)}>{config.label}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {results.empfehlung === 'kritisch' && (
                  <>Sie sollten mindestens <strong>{formatCurrency(results.fehlbetrag_minimum)}</strong> mehr Eigenkapital einbringen, um die Nebenkosten zu decken.</>
                )}
                {results.empfehlung === 'ausreichend' && (
                  <>Finanzierung möglich, aber mit höheren Zinsen. Für bessere Konditionen fehlen noch <strong>{formatCurrency(results.fehlbetrag_20)}</strong>.</>
                )}
                {results.empfehlung === 'gut' && (
                  <>Solide Eigenkapitalquote! Sie erhalten gute Finanzierungskonditionen.</>
                )}
                {results.empfehlung === 'sehr_gut' && (
                  <>Optimale Finanzierungsvoraussetzungen! Sie profitieren von den besten Zinskonditionen.</>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Results Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Euro className="h-4 w-4" />
              <span className="text-xs">Darlehensbetrag</span>
            </div>
            <p className="font-mono text-lg font-semibold">{formatCurrency(results.darlehensbetrag)}</p>
          </CardContent>
        </Card>

        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Home className="h-4 w-4" />
              <span className="text-xs">Beleihungsauslauf</span>
            </div>
            <p className="font-mono text-lg font-semibold">{formatPercent(results.beleihungsauslauf)}</p>
          </CardContent>
        </Card>

        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Percent className="h-4 w-4" />
              <span className="text-xs">Aktueller Zinssatz</span>
            </div>
            <p className="font-mono text-lg font-semibold">{formatPercent(results.aktueller_zinssatz)}</p>
          </CardContent>
        </Card>

        <Card className="result-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Euro className="h-4 w-4" />
              <span className="text-xs">Monatliche Rate</span>
            </div>
            <p className="font-mono text-lg font-semibold">{formatCurrency(results.monatliche_rate)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Cashflow (wenn Miete angegeben) */}
      {results.monatlicher_cashflow !== null && (
        <Card className={cn(
          'result-card border-2',
          results.monatlicher_cashflow >= 0 ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'
        )}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Monatlicher Cashflow</span>
            </div>
            <p className={cn(
              'font-mono text-xl font-bold',
              results.monatlicher_cashflow >= 0 ? 'text-success' : 'text-destructive'
            )}>
              {results.monatlicher_cashflow >= 0 ? '+' : ''}{formatCurrency(results.monatlicher_cashflow)}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Zusätzliche Infos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Eigenkapital-Übersicht</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Gesamtkosten</span>
            <span className="font-mono font-medium">{formatCurrency(results.gesamtkosten)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Mindest-EK (Nebenkosten)</span>
            <span className="font-mono font-medium">{formatCurrency(results.ek_minimum)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Empfohlenes EK (20%)</span>
            <span className="font-mono font-medium">{formatCurrency(results.ek_20_prozent)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Optimales EK (30%)</span>
            <span className="font-mono font-medium">{formatCurrency(results.ek_30_prozent)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
