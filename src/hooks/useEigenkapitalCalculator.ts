import { useMemo } from 'react';
import type { EigenkapitalInputs, EigenkapitalResults } from '@/types/eigenkapital';

const round = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export function useEigenkapitalCalculator(input: EigenkapitalInputs): EigenkapitalResults {
  return useMemo(() => {
    const {
      kaufpreis,
      nebenkosten_prozent = 10,
      eigenkapital_vorhanden,
      zinssatz_100 = 4.5,
      zinssatz_80 = 3.8,
      zinssatz_60 = 3.2,
      jahresmiete = 0,
    } = input;

    const nebenkosten = kaufpreis * (nebenkosten_prozent / 100);
    const gesamtkosten = kaufpreis + nebenkosten;
    const ek_minimum = nebenkosten;
    const ek_20_prozent = gesamtkosten * 0.2;
    const ek_30_prozent = gesamtkosten * 0.3;
    const ek_quote = gesamtkosten > 0 ? (eigenkapital_vorhanden / gesamtkosten) * 100 : 0;
    const darlehensbetrag = Math.max(0, gesamtkosten - eigenkapital_vorhanden);
    const beleihungsauslauf = kaufpreis > 0 ? (darlehensbetrag / kaufpreis) * 100 : 0;

    let aktueller_zinssatz: number;
    if (beleihungsauslauf > 90) {
      aktueller_zinssatz = zinssatz_100;
    } else if (beleihungsauslauf > 70) {
      aktueller_zinssatz = zinssatz_80;
    } else {
      aktueller_zinssatz = zinssatz_60;
    }

    const tilgung = 2;
    const annuitaet_prozent = aktueller_zinssatz + tilgung;
    const monatliche_rate = (darlehensbetrag * (annuitaet_prozent / 100)) / 12;

    const monatlicher_cashflow =
      jahresmiete > 0 ? jahresmiete / 12 - monatliche_rate : null;

    let empfehlung: EigenkapitalResults['empfehlung'];
    if (ek_quote < 10) {
      empfehlung = 'kritisch';
    } else if (ek_quote < 20) {
      empfehlung = 'ausreichend';
    } else if (ek_quote < 30) {
      empfehlung = 'gut';
    } else {
      empfehlung = 'sehr_gut';
    }

    return {
      kaufpreis,
      nebenkosten: round(nebenkosten, 2),
      gesamtkosten: round(gesamtkosten, 2),
      eigenkapital_vorhanden,
      ek_quote: round(ek_quote, 1),
      ek_minimum: round(ek_minimum, 2),
      ek_20_prozent: round(ek_20_prozent, 2),
      ek_30_prozent: round(ek_30_prozent, 2),
      darlehensbetrag: round(darlehensbetrag, 2),
      beleihungsauslauf: round(beleihungsauslauf, 1),
      aktueller_zinssatz,
      monatliche_rate: round(monatliche_rate, 2),
      monatlicher_cashflow: monatlicher_cashflow !== null ? round(monatlicher_cashflow, 2) : null,
      empfehlung,
      fehlbetrag_minimum: round(Math.max(0, ek_minimum - eigenkapital_vorhanden), 2),
      fehlbetrag_20: round(Math.max(0, ek_20_prozent - eigenkapital_vorhanden), 2),
    };
  }, [input]);
}
