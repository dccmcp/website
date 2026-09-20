export type LegalSection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    metaTitle: "Terms of Service",
    description:
      "The terms that govern your use of DCCMCP software, integrations and services, including license scope, acceptable use, support and liability.",
    updated: "2026-09-01",
    intro: [
      "These terms govern your access to and use of DCCMCP software, integrations, documentation and related services. By installing an integration or using a hosted component, you agree to them on behalf of yourself and, where applicable, the organization you represent.",
      "This is a baseline document written in plain language so engineering and procurement teams can review it quickly. It is not legal advice, and we will negotiate enterprise terms directly where required.",
      "Pre-release notice: as of the date at the top of this page the DCCMCP packages have not been published. Sections that describe the licensed software apply from the date a package is made available.",
    ],
    sections: [
      {
        heading: "1. License and scope of use",
        body: [
          "Subject to these terms and payment of applicable fees, we grant you a non-exclusive, non-transferable license to install and use the DCCMCP integrations you have licensed, for your internal business purposes.",
          "Seats are named to individuals. Service accounts used by continuous integration or render infrastructure count as one seat per concurrent pipeline. You may not resell, sublicense or operate the software as a service for third parties without a written agreement.",
        ],
        list: [
          "Community plan: free use of public integrations, read-only default policy.",
          "Studio plan: per-seat license covering governance, audit retention and multi-instance control.",
          "Enterprise plan: additional rights defined in your order form, which takes precedence over these terms where they conflict.",
        ],
      },
      {
        heading: "2. Your responsibilities",
        body: [
          "You are responsible for the content you process, the access you grant to agents, and the policies you configure. DCCMCP enforces the policy you write; it does not decide for you which operations are appropriate for your data.",
        ],
        list: [
          "Maintain backups of any file an agent is permitted to write to.",
          "Ensure you hold the necessary licenses for the host software you connect, including any unattended-use terms.",
          "Do not use the software to circumvent license terms, access controls or export restrictions of any third-party application.",
        ],
      },
      {
        heading: "3. Acceptable use",
        body: [
          "You may not use DCCMCP to violate applicable law, to infringe intellectual property, to distribute malware, or to gain unauthorized access to systems or data. We may suspend access where we reasonably believe use presents a security or legal risk.",
        ],
      },
      {
        heading: "4. Updates and version support",
        body: [
          "We publish a support matrix stating which host application versions each release supports. Updates may change tool behavior. We document breaking changes in the changelog and, where practical, provide a deprecation window before removing a tool.",
        ],
      },
      {
        heading: "5. Fees, trials and refunds",
        body: [
          "Paid plans are billed in advance, monthly or annually. Trials are provided for evaluation and may be terminated at the end of the trial period. Except where required by law, fees are non-refundable; if a paid period is canceled, access continues until the end of that period.",
        ],
      },
      {
        heading: "6. Intellectual property",
        body: [
          "We retain all rights in DCCMCP software, documentation and brand. You retain all rights in your own files, models, data and any custom tools you write. Nothing in these terms transfers ownership of your content.",
        ],
      },
      {
        heading: "7. Third-party software",
        body: [
          "DCCMCP integrations are independent third-party products. They are not affiliated with, endorsed by or sponsored by the vendors whose applications they connect. Vendor names and marks are used for identification only. Your use of those applications remains governed by their own terms.",
        ],
      },
      {
        heading: "8. Warranties and liability",
        body: [
          "The software is provided without warranties beyond those that cannot be excluded by law. We do not warrant that an agent will produce a correct result; automation output must be reviewed by a qualified person before it is used in production, manufacturing or delivery.",
          "To the maximum extent permitted by law, our aggregate liability is limited to the fees you paid in the twelve months preceding the claim. We are not liable for indirect or consequential loss, including lost profit, lost data or rework.",
        ],
      },
      {
        heading: "9. Termination",
        body: [
          "You may stop using the software at any time. We may terminate for material breach, including non-payment or misuse, after written notice where the breach is capable of cure. On termination, your license ends and you must remove installed packages; your local audit logs and configuration remain yours.",
        ],
      },
      {
        heading: "10. Changes and governing law",
        body: [
          "We may update these terms with reasonable notice. Continued use after an update constitutes acceptance. Governing law will be specified in your order form or, absent one, the jurisdiction in which DCCMCP is established.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy",
    description:
      "What DCCMCP collects, what stays on your machine, how website analytics and forms work, and how to exercise your data rights.",
    updated: "2026-09-01",
    intro: [
      "We designed DCCMCP so that the most sensitive data in the product — your scenes, models, drawings and geospatial layers — never reaches us by default. This policy explains what we do collect and why.",
      "This is a baseline document intended for review by your privacy or legal team. We will sign a DPA for enterprise deployments on request.",
    ],
    sections: [
      {
        heading: "1. Data that never leaves your machine",
        body: [
          "On the Community and Studio plans, MCP servers run locally. Scene contents, geometry, layer data, images and file paths stay on your hardware and are not transmitted to DCCMCP. Tool results are sent to the AI model provider you configured, under your own agreement with them.",
        ],
        list: [
          "No scene, model or layer data is sent to DCCMCP servers.",
          "Audit logs are written locally by default.",
          "No telemetry is enabled unless you explicitly turn it on.",
        ],
      },
      {
        heading: "2. Data we do collect",
        body: [
          "If you create an account, join the design partner program, submit a form or subscribe to updates, we collect the details you provide: name, work email, company, team size and the content of your message. We use it to respond and to provide the service.",
          "We also collect limited technical data required to operate the website, such as page views and aggregate performance metrics. Where analytics are used they are configured without cross-site advertising trackers.",
        ],
      },
      {
        heading: "3. Product telemetry is opt-in",
        body: [
          "If you enable telemetry, we receive aggregated tool names, durations and error classes — never arguments, file names or content. You can disable it at any time from the integration settings, and disabling it does not reduce functionality.",
        ],
      },
      {
        heading: "4. Legal bases and purposes",
        body: [
          "We process personal data to perform our contract with you, to pursue legitimate interests in operating and improving the service, and with your consent where required. We do not sell personal data and we do not use your content to train models.",
        ],
      },
      {
        heading: "5. Sharing and sub-processors",
        body: [
          "We share data only with service providers necessary to run the business, such as hosting, email delivery and payment processing, each bound by contractual obligations. An up-to-date list of sub-processors is available to enterprise customers on request.",
        ],
      },
      {
        heading: "6. Retention",
        body: [
          "Contact enquiries are retained for as long as needed to handle the relationship, then deleted on a rolling basis. Account data is retained while the account is active. Local audit logs are retained according to your own configuration.",
        ],
      },
      {
        heading: "7. Your rights",
        body: [
          "Depending on your jurisdiction you may request access, correction, deletion, portability or restriction of processing, and you may object to processing based on legitimate interests. Contact support@dccmcp.com and we will respond within the period required by applicable law.",
        ],
      },
      {
        heading: "8. Security and international transfers",
        body: [
          "We apply the measures described in our security overview, including encryption in transit, least-privilege access and audit logging. Where personal data is transferred internationally we rely on appropriate safeguards such as standard contractual clauses.",
        ],
      },
      {
        heading: "9. Children and changes",
        body: [
          "The service is intended for professional use and is not directed at children. We will post any changes to this policy on this page with an updated revision date.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    metaTitle: "Cookie Policy",
    description:
      "Which cookies and similar technologies the DCCMCP website uses, what they are for, and how to control them.",
    updated: "2026-09-20",
    intro: [
      "This policy covers the DCCMCP website. It does not cover the DCCMCP integrations, which run locally in your own environment and do not set cookies.",
    ],
    sections: [
      {
        heading: "1. What we use",
        body: [
          "We keep this to the minimum required to serve a website and, only if you agree to it, to understand which pages are useful. We do not use advertising cookies, cross-site tracking pixels or data brokers.",
        ],
        list: [
          "Strictly necessary — required to serve pages, remember your theme preference and protect forms against abuse. These cannot be switched off.",
          "Analytics — cookieless aggregate page metrics, loaded only when analytics is enabled on this deployment. No cross-site profile is built and no identifier is shared with advertisers.",
        ],
      },
      {
        heading: "2. What we do not use",
        body: [
          "No advertising or retargeting cookies, no social media tracking pixels, and no third-party cookies that follow you to other sites.",
        ],
      },
      {
        heading: "3. Controlling cookies",
        body: [
          "You can block or delete cookies in your browser settings. Blocking strictly necessary cookies may break parts of the site, including form submission.",
          "Because analytics on this site are cookieless, there is no analytics cookie to opt out of. Where a deployment enables a cookie-based tool, it will be listed here before it is switched on.",
        ],
      },
      {
        heading: "4. Questions",
        body: [
          "Email support@dccmcp.com and we will explain exactly which cookies a given page sets.",
        ],
      },
    ],
  },
  {
    slug: "dpa",
    title: "Data Processing Agreement",
    metaTitle: "Data Processing Agreement (DPA)",
    description:
      "How DCCMCP processes personal data on behalf of business customers: roles, scope, security measures, sub-processors and international transfers.",
    updated: "2026-09-20",
    intro: [
      "This page summarises the data processing terms we offer to business customers. It is a summary, not the agreement itself — enterprise customers receive a signature-ready DPA. Email support@dccmcp.com to request one.",
    ],
    sections: [
      {
        heading: "1. Roles",
        body: [
          "For the paid plans, you are the controller of any personal data processed through the service and DCCMCP acts as your processor. Where we process data for our own purposes — billing, support, security — we act as an independent controller and our privacy policy applies.",
          "On the Community edition the integrations run entirely on your hardware, so no personal data is processed by us at all.",
        ],
      },
      {
        heading: "2. Scope of processing",
        body: [
          "Processing is limited to what is needed to provide the service: account and licence administration, support requests you send us, and — only if you enable audit export — the tool-call records you choose to transmit.",
        ],
        list: [
          "Categories of data subject: your named users and the contacts you give us.",
          "Categories of personal data: name, work email, organisation, role, and licence or authentication identifiers.",
          "Customer content: never. Scene, model, layer, image and file-path data stay in your environment.",
          "Duration: for the term of the agreement, then deletion or return as described in section 5.",
        ],
      },
      {
        heading: "3. Security measures",
        body: [
          "The technical and organisational measures are described in our security overview: least privilege by default, encryption in transit, hashed tokens, append-only audit logs and no outbound connectivity requirement for the local servers.",
        ],
      },
      {
        heading: "4. Sub-processors",
        body: [
          "We use a short list of sub-processors for website hosting, email delivery and payment handling. They are listed on the sub-processors page, and we give notice before adding one that processes customer personal data.",
        ],
      },
      {
        heading: "5. Deletion and return",
        body: [
          "On termination you can export your configuration and audit records, and we delete personal data we hold within 30 days, except where law requires longer retention for accounting or tax purposes.",
        ],
      },
      {
        heading: "6. International transfers",
        body: [
          "Where personal data is transferred outside your region we rely on appropriate safeguards such as standard contractual clauses. Enterprise deployments can be configured to keep all data inside your own network.",
        ],
      },
      {
        heading: "7. Assistance",
        body: [
          "We assist with data subject requests, security questionnaires and impact assessments relating to the service. Email support@dccmcp.com and we will respond within the period required by your agreement.",
        ],
      },
    ],
  },
  {
    slug: "sub-processors",
    title: "Sub-processors",
    metaTitle: "Sub-processors",
    description:
      "The third parties DCCMCP uses to operate its website and commercial services, and how customers are notified of changes.",
    updated: "2026-09-20",
    intro: [
      "This list covers the services we use to run dccmcp.com and the commercial plans. It does not cover the integrations themselves: the local MCP servers run in your environment and send nothing to us.",
    ],
    sections: [
      {
        heading: "1. Current sub-processors",
        body: [
          "We keep this list deliberately short. Each entry names the purpose the sub-processor serves and the category of data involved.",
        ],
        list: [
          "Vercel Inc. — website hosting, edge delivery and request logs (IP address, user agent, requested URL).",
          "Email delivery provider — transactional email such as the contact-form notification you send us (name, email, message). Configured per deployment.",
          "Payment processor — only for paid plans; card data is handled by the processor and never reaches our systems.",
        ],
      },
      {
        heading: "2. What is never sent",
        body: [
          "Customer content — scenes, models, drawings, layers, images and file paths — is never transmitted to a sub-processor, because the integrations run locally and do not report back.",
        ],
      },
      {
        heading: "3. Changes and objections",
        body: [
          "We publish any addition to this list before it begins processing customer personal data. Customers on the Studio and Enterprise plans are notified by email and may object in writing; if we cannot accommodate an objection, you may terminate the affected plan without penalty.",
        ],
      },
      {
        heading: "4. Contact",
        body: [
          "Questions about a specific sub-processor: support@dccmcp.com.",
        ],
      },
    ],
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    metaTitle: "Acceptable Use Policy",
    description:
      "What you may and may not do with DCCMCP integrations, including licence compliance for host applications and prohibited uses.",
    updated: "2026-09-20",
    intro: [
      "DCCMCP connects AI agents to software you already license. This policy sets out the limits on that use. It applies to every plan, including the free Community edition.",
    ],
    sections: [
      {
        heading: "1. You are responsible for host application licences",
        body: [
          "Connecting an agent to Blender, Maya, Houdini, Rhino, ZBrush, Photoshop, FreeCAD, QGIS or any other application does not change that application's licence terms. If your licence restricts unattended, batch, server-side or concurrent use, those restrictions still apply.",
        ],
      },
      {
        heading: "2. Prohibited uses",
        body: [
          "Do not use DCCMCP to break the law or the rights of others.",
        ],
        list: [
          "Circumventing licence checks, activation or access controls of any host application.",
          "Using the integrations to build a competing service that resells access to a host application.",
          "Distributing malware, ransomware or code intended to damage a system or a customer's files.",
          "Gaining unauthorised access to systems, data or accounts you do not own.",
          "Removing or hiding the audit trail that the software produces.",
          "Using the AI agents to generate content that infringes third-party intellectual property.",
        ],
      },
      {
        heading: "3. Shared deployments",
        body: [
          "Where you run the HTTP transport for a team, you are responsible for who can reach it. Keep it behind your network, use the token authentication, and do not expose it to the public internet.",
        ],
      },
      {
        heading: "4. Automation and review",
        body: [
          "DCCMCP does not guarantee that an agent produces a correct result. Output used in production, manufacturing or delivery should be reviewed by a qualified person before it is relied on.",
        ],
      },
      {
        heading: "5. Enforcement and reporting",
        body: [
          "We may suspend access where we reasonably believe use presents a legal, security or safety risk. Report abuse or a suspected violation to support@dccmcp.com.",
        ],
      },
    ],
  },
  {
    slug: "security",
    title: "Security Overview",
    metaTitle: "Security Overview",
    description:
      "How DCCMCP handles transport, credentials, policy enforcement, audit logging, supply chain integrity and vulnerability disclosure.",
    updated: "2026-09-01",
    intro: [
      "This overview is written for the people who have to sign off on deploying agent automation inside a studio or engineering organization. It describes the security model, the defaults, and what happens when something goes wrong.",
    ],
    sections: [
      {
        heading: "1. Deployment model",
        body: [
          "The default architecture is local. The MCP server runs as a process on your machine next to the host application, and the agent connects over stdio. Nothing binds to a network interface unless you configure the HTTP transport.",
          "When HTTP transport is enabled it binds to loopback by default, requires a bearer token, and can be restricted to a set of allowed client origins. Enterprise deployments can run entirely inside your network with no outbound connectivity.",
        ],
      },
      {
        heading: "2. Least privilege by default",
        body: [
          "A fresh install is read-only. Write and execute tools are denied until a policy grants them, and policies can be scoped by project path, tool name and file pattern. Deny rules always take precedence over allow rules.",
        ],
        list: [
          "Read tools inspect state and never modify a file.",
          "Write tools run inside a checkpointed transaction.",
          "Execute tools run long jobs and return artifacts, with resource limits.",
        ],
      },
      {
        heading: "3. Reversibility",
        body: [
          "Destructive operations create a checkpoint before they run. Restores can be scoped to a single object or a full file, and the host application's own undo history is preserved so a human can intervene manually.",
        ],
      },
      {
        heading: "4. Credentials and secrets",
        body: [
          "Integration credentials are stored in the operating system keychain where available. Server tokens are hashed at rest, support rotation, and are never written to audit logs. We do not require you to share host application credentials with DCCMCP.",
        ],
      },
      {
        heading: "5. Audit logging",
        body: [
          "Every tool call is recorded with the tool name, arguments, actor, timestamp, host application version, result status and a file fingerprint. Entries are append-only locally and can be streamed to a webhook or SIEM under Enterprise.",
        ],
      },
      {
        heading: "6. Supply chain",
        body: [
          "Release artifacts are built from tagged sources in a controlled pipeline, signed, and published with checksums. Enterprise customers can receive a software bill of materials and mirrored, offline-installable packages.",
        ],
      },
      {
        heading: "7. Vulnerability handling",
        body: [
          "We triage reported vulnerabilities within two business days. Confirmed issues in a supported release receive a fix on a timeline matched to severity, and we credit reporters who wish to be named once a fix is available.",
          "Report security issues to support@dccmcp.com. Please include reproduction steps and avoid accessing data that is not yours.",
        ],
      },
      {
        heading: "8. What we do not claim",
        body: [
          "We are not SOC 2 certified today. We are documenting controls against SOC 2 criteria and will publish the report when a completed audit exists. Any organization requiring current certification before a pilot should treat that as a blocker rather than assume a timeline.",
        ],
      },
    ],
  },
  {
    slug: "third-party-notice",
    title: "Third-party Notice",
    metaTitle: "Third-party Notice",
    description:
      "DCCMCP is an independent third-party integration provider. How we reference other vendors' products, and how open-source components are credited.",
    updated: "2026-09-01",
    intro: [
      "This notice explains what DCCMCP does, how we relate to the software vendors whose applications we connect to, and how we handle open-source components. The short version: we write MCP integration software. We do not make, sell, license or support the host applications themselves, and we are not affiliated with any vendor or project we interoperate with.",
    ],
    sections: [
      {
        heading: "1. What we do, and what we do not do",
        body: [
          "DCCMCP builds MCP (Model Context Protocol) servers, plugins and adapters. Our software is an integration layer: it lets an AI agent call tools inside a host application that you have installed and licensed yourself.",
          "We do not develop, own, distribute, license, host or provide technical support for those host applications, and we do not modify them. When something goes wrong inside Blender, Maya, Houdini, Photoshop, QGIS or any other host application, the vendor or project that maintains it is the correct place to look — we support the integration layer.",
        ],
        list: [
          "We write and support the MCP integration only.",
          "The host application remains the property and responsibility of its vendor or project.",
          "Your license for the host application is unaffected by installing our integration.",
        ],
      },
      {
        heading: "2. No affiliation, endorsement or sponsorship",
        body: [
          "DCCMCP is an independent product. We are not affiliated with, endorsed by, sponsored by, certified by or otherwise connected to any vendor or project whose software we interoperate with.",
          "Where we name a product, we do so to describe compatibility. The companies and projects listed here are examples, not a complete list — the same position applies to every other vendor, project or product mentioned anywhere on this site, and to software we integrate with in future.",
        ],
        list: [
          "Autodesk (Maya, 3ds Max, Revit, Civil 3D)",
          "Adobe (Photoshop)",
          "Maxon (ZBrush)",
          "The Blender Foundation (Blender)",
          "Robert McNeel & Associates (Rhino, Grasshopper)",
          "The FreeCAD project",
          "The QGIS project",
          "The OpenCV project",
          "Every other vendor, project or product named on this site",
        ],
      },
      {
        heading: "3. Why we name other products",
        body: [
          "Software names are used descriptively to identify which applications an integration connects to, and to describe compatibility — nothing implies an official relationship. All product names, marks and logos remain the property of their respective owners, and any use on this site is for identification and compatibility purposes only.",
        ],
      },
      {
        heading: "4. Brand marks and where they come from",
        body: [
          "The client marks shown in our \"supported agents\" lists come from the LobeHub Icons collection (https://github.com/lobehub/lobe-icons), which is distributed under the MIT license. That license covers the artwork files; it does not grant trademark rights, which remain with each brand owner.",
          "We render those marks unmodified apart from color — a single accent color, no distortion, no addition of our own branding — and only to indicate that the named client can connect to our MCP servers. Their appearance does not imply partnership, endorsement, sponsorship or certification by the brand owner.",
          "Icons for host applications (Blender, Maya, Houdini, 3ds Max, Rhino, ZBrush, Photoshop, FreeCAD, QGIS, OpenCV) are our own abstract glyphs rather than vendor artwork. Where we do not have a client mark on file, we show a generic agent glyph instead.",
          "Rights holders can ask us to correct or remove a mark at any time — see the corrections section below.",
        ],
      },
      {
        heading: "5. Your license obligations",
        body: [
          "Connecting an agent to a host application does not change the licensing terms of that application. You remain responsible for ensuring your use — including unattended, batch or server-side execution — complies with the vendor's license.",
        ],
      },
      {
        heading: "6. Open-source components",
        body: [
          "Our products may include open-source libraries. Required attributions, license texts and notices are included with each release and documented in the accompanying NOTICE file. Where we use open-source components, we do so under the terms of their licenses. The agent brand marks vendored from LobeHub Icons remain under the MIT license of that project, with attribution retained in our source.",
        ],
      },
      {
        heading: "7. Corrections",
        body: [
          "If you are a rights holder and believe we have described your product or used a mark incorrectly, contact support@dccmcp.com and we will correct or remove the reference promptly.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((doc) => doc.slug === slug);
}
