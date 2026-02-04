import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Wallet, TrendingUp } from 'lucide-react';
import type { EigenkapitalInputs } from '@/types/eigenkapital';

interface EKInputFormProps {
  inputs: EigenkapitalInputs;
  onChange: (inputs: EigenkapitalInputs) => void;
}

export function EKInputForm({ inputs, onChange }: EKInputFormProps) {
  const updateField = (field: keyof EigenkapitalInputs, value: number) => {
    onChange({ ...inputs, [field]: value });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE').format(value);
  };

  return (
    <div className="space-y-4">
      {/* Gruppe 1: Kaufpreis & Nebenkosten */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-5 w-5 text-primary" />
            Kaufpreis & Nebenkosten
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kaufpreis">Kaufpreis</Label>
            <div className="relative">
              <Input
                id="kaufpreis"
                type="number"
                value={inputs.kaufpreis || ''}
                onChange={(e) => updateField('kaufpreis', Number(e.target.value))}
                className="pr-8"
                placeholder="300.000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nebenkosten_prozent">
              Kaufnebenkosten
              <span className="text-muted-foreground text-xs ml-2">(inkl. Makler)</span>
            </Label>
            <div className="relative">
              <Input
                id="nebenkosten_prozent"
                type="number"
                step="0.1"
                value={inputs.nebenkosten_prozent || ''}
                onChange={(e) => updateField('nebenkosten_prozent', Number(e.target.value))}
                className="pr-8"
                placeholder="10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              = {formatCurrency(inputs.kaufpreis * (inputs.nebenkosten_prozent / 100))} €
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Gruppe 2: Finanzierung */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Wallet className="h-5 w-5 text-primary" />
            Finanzierung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eigenkapital_vorhanden">
              Vorhandenes Eigenkapital
              <span className="text-muted-foreground text-xs ml-2">(Liquide Mittel)</span>
            </Label>
            <div className="relative">
              <Input
                id="eigenkapital_vorhanden"
                type="number"
                value={inputs.eigenkapital_vorhanden || ''}
                onChange={(e) => updateField('eigenkapital_vorhanden', Number(e.target.value))}
                className="pr-8"
                placeholder="60.000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="zinssatz_100" className="text-xs">
                Zins 100%
              </Label>
              <div className="relative">
                <Input
                  id="zinssatz_100"
                  type="number"
                  step="0.1"
                  value={inputs.zinssatz_100 || ''}
                  onChange={(e) => updateField('zinssatz_100', Number(e.target.value))}
                  className="pr-6 text-sm"
                  placeholder="4.5"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zinssatz_80" className="text-xs">
                Zins 80%
              </Label>
              <div className="relative">
                <Input
                  id="zinssatz_80"
                  type="number"
                  step="0.1"
                  value={inputs.zinssatz_80 || ''}
                  onChange={(e) => updateField('zinssatz_80', Number(e.target.value))}
                  className="pr-6 text-sm"
                  placeholder="3.8"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zinssatz_60" className="text-xs">
                Zins 60%
              </Label>
              <div className="relative">
                <Input
                  id="zinssatz_60"
                  type="number"
                  step="0.1"
                  value={inputs.zinssatz_60 || ''}
                  onChange={(e) => updateField('zinssatz_60', Number(e.target.value))}
                  className="pr-6 text-sm"
                  placeholder="3.2"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gruppe 3: Einnahmen (Optional) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-5 w-5 text-primary" />
            Erwartete Einnahmen
            <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="jahresmiete">
              Erwartete Jahresmiete
              <span className="text-muted-foreground text-xs ml-2">(Kaltmiete)</span>
            </Label>
            <div className="relative">
              <Input
                id="jahresmiete"
                type="number"
                value={inputs.jahresmiete || ''}
                onChange={(e) => updateField('jahresmiete', Number(e.target.value))}
                className="pr-8"
                placeholder="12.000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
            </div>
            {inputs.jahresmiete > 0 && (
              <p className="text-xs text-muted-foreground">
                = {formatCurrency(Math.round(inputs.jahresmiete / 12))} € / Monat
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
