import EsZeroLogon from './zerologon-domain-compromise.es.mdx';

// Spanish translations of individual writeups, keyed by post id. A writeup with
// an entry here gets a page under /es/research/; one without stays English-only
// (and its English page carries no hreflang pair).
export interface WriteupTranslation {
  Content: any;
  title: string;
  summary: string;
  severity?: string;
  status: string;
}

export const translations: Record<string, WriteupTranslation> = {
  'zerologon-domain-compromise': {
    Content: EsZeroLogon,
    title: 'Compromiso de dominio vía ZeroLogon, y ayudando a solucionarlo',
    summary:
      'Detecté que el controlador de dominio de mi centro educativo estaba expuesto a ZeroLogon (CVE-2020-1472), demostré el impacto de forma responsable, lo reporté de inmediato y colaboré con el centro para remediar y reforzar la infraestructura.',
    severity: 'CVSS 10.0 (Crítico)',
    status: 'Divulgado y remediado',
  },
};
