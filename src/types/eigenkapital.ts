export interface EigenkapitalInputs {
  kaufpreis: number;
  nebenkosten_prozent: number;
  eigenkapital_vorhanden: number;
  zinssatz_100: number;
  zinssatz_80: number;
  zinssatz_60: number;
  jahresmiete: number;
}

export interface EigenkapitalResults {
  kaufpreis: number;
  nebenkosten: number;
  gesamtkosten: number;
  eigenkapital_vorhanden: number;
  ek_quote: number;
  ek_minimum: number;
  ek_20_prozent: number;
  ek_30_prozent: number;
  darlehensbetrag: number;
  beleihungsauslauf: number;
  aktueller_zinssatz: number;
  monatliche_rate: number;
  monatlicher_cashflow: number | null;
  empfehlung: 'kritisch' | 'ausreichend' | 'gut' | 'sehr_gut';
  fehlbetrag_minimum: number;
  fehlbetrag_20: number;
}

export const defaultEigenkapitalInputs: EigenkapitalInputs = {
  kaufpreis: 300000,
  nebenkosten_prozent: 10,
  eigenkapital_vorhanden: 60000,
  zinssatz_100: 4.5,
  zinssatz_80: 3.8,
  zinssatz_60: 3.2,
  jahresmiete: 0,
};
