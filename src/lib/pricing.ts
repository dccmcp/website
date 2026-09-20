export type Plan = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  bestFor: string;
  featured?: boolean;
  cta: { label: string; href: string };
  includes: string[];
};

export const plans: Plan[] = [
  {
    id: "community",
    name: "Community",
    price: "$0",
    cadence: "forever",
    blurb: "Everything a solo designer or engineer needs to connect an agent to one machine. Free at launch — no account, no card, no call.",
    bestFor: "Solo artists, students and evaluation",
    cta: { label: "Coming soon", href: "/download" },
    includes: [
      "All public integrations (Blender, Rhino, FreeCAD, QGIS, OpenCV)",
      "Read-only-by-default safety policy",
      "Local stdio transport",
      "Community support and Discord",
      "Unlimited local sessions",
    ],
  },
  {
    id: "pro",
    name: "Studio",
    price: "$39",
    cadence: "per user / month",
    blurb: "Production tooling for working studios: multi-instance control, audit logs and shared policies.",
    bestFor: "Freelancers and small studios shipping client work",
    featured: true,
    cta: { label: "Start 14-day trial", href: "/pricing#compare" },
    includes: [
      "Everything in Community",
      "Multi-instance and headless/batch control",
      "Audit logs with 90-day retention",
      "Team policy profiles and approval gates",
      "Custom tool registration (Skills SDK)",
      "Streamable HTTP transport for LAN agents",
      "Email support with 2 business day response",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    blurb: "For pipelines that cannot be interrupted: SSO, self-hosting, compliance reviews and custom integrations.",
    bestFor: "Studios, AEC firms and manufacturers with IT requirements",
    cta: { label: "Contact sales", href: "/enterprise#contact" },
    includes: [
      "Everything in Studio",
      "SSO/SAML, SCIM and role-based access control",
      "Self-hosted or air-gapped deployment",
      "Unlimited audit retention with SIEM export",
      "Custom integration development",
      "Signed builds and SBOM delivery",
      "Named solutions engineer and 99.9% support SLA",
    ],
  },
];

export type CompareRow = {
  group: string;
  rows: { feature: string; community: string | boolean; studio: string | boolean; enterprise: string | boolean }[];
};

export const compare: CompareRow[] = [
  {
    group: "Integrations",
    rows: [
      { feature: "Public integrations", community: "5", studio: "5", enterprise: "5 + custom" },
      { feature: "Custom tool registration", community: false, studio: true, enterprise: true },
      { feature: "Private/bespoke software bridges", community: false, studio: false, enterprise: true },
      { feature: "Legacy host versions", community: false, studio: false, enterprise: true },
    ],
  },
  {
    group: "Control & safety",
    rows: [
      { feature: "Safety policy profiles", community: "1 local", studio: "Shared team", enterprise: "Shared + enforced" },
      { feature: "Approval gates for write tools", community: "Basic", studio: true, enterprise: "Custom rules" },
      { feature: "Checkpoints and rollback", community: true, studio: true, enterprise: true },
      { feature: "Read-only default", community: true, studio: true, enterprise: true },
    ],
  },
  {
    group: "Governance",
    rows: [
      { feature: "Audit log retention", community: "7 days local", studio: "90 days", enterprise: "Unlimited" },
      { feature: "SIEM / webhook export", community: false, studio: "Webhook", enterprise: "SIEM + webhook" },
      { feature: "SSO / SAML / SCIM", community: false, studio: false, enterprise: true },
      { feature: "Self-hosted or air-gapped", community: false, studio: false, enterprise: true },
      { feature: "Signed builds and SBOM", community: false, studio: false, enterprise: true },
    ],
  },
  {
    group: "Operations",
    rows: [
      { feature: "Transport", community: "stdio", studio: "stdio + HTTP", enterprise: "stdio + HTTP + mTLS" },
      { feature: "Multi-instance control", community: false, studio: "Up to 5", enterprise: "Unlimited" },
      { feature: "Headless / batch workers", community: "Manual", studio: true, enterprise: "Orchestrated" },
      { feature: "Support", community: "Community", studio: "2 business days", enterprise: "Named SE + SLA" },
    ],
  },
];

export const pricingFaq = [
  {
    q: "What counts as a user?",
    a: "A named person who connects an agent to a DCCMCP integration. Service accounts used by CI or render farms count as a single seat per concurrent pipeline, not per job.",
  },
  {
    q: "Do I need a paid plan to try an integration?",
    a: "No. The Community plan includes every public integration with a read-only-by-default policy. Upgrade when you need write access in shared or production files.",
  },
  {
    q: "Does my data leave my machine?",
    a: "Not on Community or Studio. Those run entirely on your hardware. Enterprise self-hosting keeps all traffic inside your network, including audit logs.",
  },
  {
    q: "Can I buy an integration for software you do not list yet?",
    a: "Yes. Enterprise customers can commission private bridges. We have shipped integrations for in-house asset systems, render managers and proprietary CAD tools.",
  },
  {
    q: "What happens when my trial ends?",
    a: "Your configuration, policies and audit history stay intact and the workspace reverts to Community limits until you choose a plan. Nothing is deleted.",
  },
  {
    q: "Do you offer academic or startup pricing?",
    a: "Yes. Verified academic labs get Studio free for teaching and non-commercial research, and early-stage studios can request a discounted first year.",
  },
];
