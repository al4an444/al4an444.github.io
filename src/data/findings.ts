export interface FindingLink {
  href: string;
  label: string;
}

export interface Finding {
  project: string;
  title: string;
  severity?: string;
  status: string;
  statusKind: 'fixed' | 'accepted' | 'reported' | 'duplicate';
  summary: string;
  featured?: boolean;
  payout?: string;
  links?: FindingLink[];
}

// Only three findings are surfaced. grpc-go is public, so it carries full
// detail and links. The NVIDIA and Microsoft reports are non-public and
// unresolved — kept deliberately high-level (vendor · program · severity ·
// status), with no titles, technique, CWE, CVSS vector or PoC, in line with
// responsible disclosure.
export const findings: Finding[] = [
  {
    project: 'grpc-go',
    title: 'Authentication bypass in xDS RBAC',
    severity: 'CVSS 7.5 (High)',
    status: 'Fixed by Google · v1.81.1',
    statusKind: 'fixed',
    summary:
      'The authenticatedMatcher fell through from URI/DNS SAN to the Subject DN, allowing an authorization bypass in the xDS RBAC engine.',
    featured: true,
    payout: '$3,133',
    links: [
      { href: 'https://github.com/grpc/grpc-go/pull/9111', label: 'Fix PR #9111' },
      {
        href: 'https://newreleases.io/project/github/grpc/grpc-go/release/v1.81.1',
        label: 'Release notes, credited',
      },
    ],
  },
  {
    project: 'NVIDIA · Public Bug Bounty / PSIRT',
    title: 'High-severity vulnerability',
    severity: 'High severity',
    status: 'Reproduced & under review',
    statusKind: 'reported',
    payout: '$4,000',
    summary:
      "Confirmed and reproduced by NVIDIA's security team and now under active review. Details are withheld pending resolution, in line with responsible disclosure.",
  },
  {
    project: 'Microsoft · MSRC',
    title: 'High-severity vulnerability',
    severity: 'High severity',
    status: 'Under review',
    statusKind: 'reported',
    payout: '$10,000',
    summary:
      'Reported to Microsoft (MSRC) and currently under review and reproduction. Details are withheld pending resolution, in line with responsible disclosure.',
  },
];

export interface Project {
  name: string;
  description: string;
  tech: string[];
  href: string;
}

export const projects: Project[] = [
  {
    name: 'shutdown-restore',
    description:
      'Automated C++ Windows service that creates a system restore point on shutdown, bypassing the 24h limit and rotating old backups.',
    tech: ['C++', 'Windows Service'],
    href: 'https://github.com/al4an444/shutdown-restore',
  },
  {
    name: 'ghosttalk',
    description:
      'A secure, end-to-end encrypted (E2EE) zero-knowledge chat application built with React, Supabase and the Web Crypto API.',
    tech: ['TypeScript', 'React', 'Supabase', 'Web Crypto API'],
    href: 'https://github.com/al4an444/ghosttalk',
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  /** Path under /public to the certificate image, opened in a lightbox. */
  image: string;
}

export const certifications: Certification[] = [
  {
    name: 'Introduction to the Threat Landscape 3.0',
    issuer: 'Fortinet Training Institute',
    date: 'Apr 2026',
    image: '/certs/fortinet-threat-landscape.webp',
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Apr 2026',
    image: '/certs/cisco-intro-cybersecurity.webp',
  },
];
