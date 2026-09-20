import { agentClients } from "@/lib/agents";

export type ToolSpec = {
  name: string;
  description: string;
  risk: "read" | "write" | "execute";
};

export type Integration = {
  slug: string;
  software: string;
  name: string;
  category:
    | "3D & Animation"
    | "CAD & Parametric"
    | "GIS & Geospatial"
    | "Vision & Automation"
    | "FX & Simulation"
    | "2D & Texture"
    | "Sculpting & Texturing";
  status: "Stable" | "Beta" | "Preview";
  tagline: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywords: string[];
  /** Shown on the landing page grid; the rest live on /integrations and their own page. */
  featured?: boolean;
  /** ISO date of the last content/version review, used for sitemap lastModified. */
  updated?: string;
  /** Two-line pitch shown in the hero of the product page. */
  heroLead: string;
  /** Version / requirement table rows. */
  specs: { label: string; value: string }[];
  problems: { title: string; body: string }[];
  workflows: { title: string; body: string }[];
  tools: ToolSpec[];
  install: { title: string; body: string; code?: string }[];
  agents: string[];
  faq: { q: string; a: string }[];
};

export const integrations: Integration[] = [
  {
    slug: "mcp-for-blender",
    featured: true,
    updated: "2026-09-20",
    software: "Blender",
    name: "MCP for Blender",
    category: "3D & Animation",
    status: "Stable",
    tagline: "Connect AI agents to Blender — scene graph, geometry nodes, renders and batch automation.",
    summary:
      "A local MCP server plus Blender addon that exposes typed, audited tools for scene inspection, modeling, geometry nodes, shading, rendering and headless batch jobs.",
    metaTitle: "MCP for Blender — Connect AI Agents to Blender (Claude, Cursor)",
    metaDescription:
      "MCP for Blender connects Claude, Cursor and custom agents to a real Blender session. Typed tools for scene graph, geometry nodes, materials, rendering and batch automation — with safety policies and audit logs.",
    primaryKeyword: "MCP for Blender",
    keywords: [
      "MCP for Blender",
      "AI control Blender with MCP",
      "Blender MCP server",
      "connect Claude to Blender",
      "Blender automation AI agent",
      "geometry nodes MCP",
    ],
    heroLead:
      "Give your agent a real Blender session instead of a blank Python prompt. Every tool call is typed, validated against the current scene, and written to an audit log.",
    specs: [
      { label: "Host software", value: "Blender 4.2 LTS and newer (4.5, 5.x)" },
      { label: "Runtime", value: "Python 3.11+, bundled with Blender" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (remote studio)" },
      { label: "Install", value: "Blender addon + npx dccmcp-blender" },
      { label: "Modes", value: "Interactive viewport, background/headless, batch farm workers" },
      { label: "Platforms", value: "macOS, Windows, Linux" },
    ],
    problems: [
      {
        title: "Generated scripts assume a scene that does not exist",
        body: "An LLM writing bpy code has never seen your file. It guesses collection names, object paths and modifier stacks, then fails halfway through and leaves a half-modified scene behind.",
      },
      {
        title: "A crash wipes out an hour of work",
        body: "Scripts that call destructive operators without a checkpoint can corrupt a scene, break linked libraries, or take the viewport down with them.",
      },
      {
        title: "Nobody can review what the model did",
        body: "When an automation runs unattended, there is no record of which object was changed, by whom, at what time — which makes studio sign-off impossible.",
      },
    ],
    workflows: [
      {
        title: "Inspect before it acts",
        body: "The agent calls scene.inspect and receives a structured summary of collections, objects, modifiers, materials and units before it proposes any change.",
      },
      {
        title: "Typed tools instead of free-form bpy",
        body: "Tools accept validated schemas — mesh names, unit-aware dimensions, slot indices. Invalid calls are rejected at the edge, not in the middle of a render.",
      },
      {
        title: "Checkpointed write operations",
        body: "Every mutating tool runs inside a transaction that can be previewed, applied, or rolled back. Undo history stays intact for manual cleanup.",
      },
      {
        title: "Batch and headless parity",
        body: "The same tool surface drives Blender in background mode, so an agent can build variants across a render farm with identical semantics.",
      },
    ],
    tools: [
      { name: "scene.inspect", description: "Structured snapshot of collections, objects, transforms, modifiers, materials and units.", risk: "read" },
      { name: "object.create", description: "Create primitive or data-driven objects with validated transforms and parenting.", risk: "write" },
      { name: "mesh.edit", description: "Non-destructive mesh operations with explicit selection scoping and dry-run preview.", risk: "write" },
      { name: "geometry_nodes.set_input", description: "Drive geometry node inputs by socket name and type, including simulation zones.", risk: "write" },
      { name: "material.assign", description: "Assign or build shader graphs, including principled BSDF parameter sets.", risk: "write" },
      { name: "render.capture", description: "Queue viewport or final renders and return rendered images for verification.", risk: "execute" },
      { name: "pipeline.checkpoint", description: "Create, list and restore named checkpoints of the current file state.", risk: "write" },
      { name: "asset.search", description: "Search local asset libraries and return typed asset references.", risk: "read" },
    ],
    install: [
      {
        title: "Install the addon",
        body: "Add the DCCMCP addon to Blender and enable it in Preferences → Add-ons. The addon opens a local control channel and never listens on a public interface by default.",
        code: "blender --command extension install dccmcp_blender",
      },
      {
        title: "Start the MCP server",
        body: "Run the server from your project directory. It discovers a running Blender session and advertises its tool list to the client.",
        code: "npx dccmcp-blender@latest serve --port 7331",
      },
      {
        title: "Register with your agent",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw, VS Code or any other MCP-compatible client — they all speak the same stdio or HTTP transport.",
        code: '{\n  "mcpServers": {\n    "blender": { "command": "npx", "args": ["dccmcp-blender", "serve"] }\n  }\n}',
      },
      {
        title: "Set a policy",
        body: "Choose which tools are auto-approved, which require confirmation, and which are disabled in production files. Defaults are read-only.",
        code: "dccmcp policy set --profile studio-default",
      },
    ],
    agents: [...agentClients, "Windsurf"],
    faq: [
      {
        q: "Does MCP for Blender send my .blend files to the cloud?",
        a: "No. The server runs on your machine and talks to your local Blender process. Scene data only leaves your network if you explicitly configure a remote HTTP transport for a studio deployment — and even then, only the tool results the agent asked for are transmitted.",
      },
      {
        q: "Can an agent break my production scene?",
        a: "Mutating tools run behind a policy layer. The default profile is read-only, checkpoints are created before destructive operations, and every call is reversible through Blender's own undo stack plus DCCMCP checkpoints.",
      },
      {
        q: "Does it work with Blender in background mode?",
        a: "Yes. The same tool surface is available in -b/--background sessions, which is how most studios drive variant generation and render farms.",
      },
      {
        q: "Which Blender versions are supported?",
        a: "Blender 4.2 LTS and newer, including 4.5 LTS and the 5.x line. Legacy 3.x support is available on the enterprise track.",
      },
      {
        q: "How is this different from letting the model write bpy scripts?",
        a: "Generated scripts are unvalidated, unrunnable in isolation and impossible to review. DCCMCP exposes a stable, discoverable tool surface with schemas, permissioning and audit trails, so the agent works against a contract instead of a guess.",
      },
    ],
  },
  {
    slug: "mcp-for-rhino",
    featured: true,
    updated: "2026-09-20",
    software: "Rhino",
    name: "MCP for Rhino",
    category: "CAD & Parametric",
    status: "Stable",
    tagline: "Drive Rhino and Grasshopper from an AI agent — NURBS, layers, blocks and parametric definitions.",
    summary:
      "An MCP server and Rhino plugin that gives agents typed access to Rhino documents and Grasshopper definitions: geometry creation, layer and block management, solver control and bake-back.",
    metaTitle: "MCP for Rhino — Connect AI Agents to Rhino & Grasshopper",
    metaDescription:
      "MCP for Rhino connects Claude, Cursor and custom agents to Rhino and Grasshopper. Typed tools for NURBS geometry, layers, blocks, parametric solver control and bake workflows, with audit logs.",
    primaryKeyword: "MCP for Rhino",
    keywords: [
      "MCP for Rhino",
      "connect Claude to Rhino",
      "Rhino MCP server",
      "Grasshopper AI agent",
      "RhinoCommon automation",
      "parametric design MCP",
    ],
    heroLead:
      "Agents that understand documents, not just commands. Inspect layers, units and tolerances first, then build geometry that respects the file you actually have open.",
    specs: [
      { label: "Host software", value: "Rhino 7, Rhino 8, Rhino 9 (WIP track)" },
      { label: "Runtime", value: "RhinoCommon / .NET 7 + Python 3 bridge" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (studio)" },
      { label: "Install", value: "Yak package + npx dccmcp-rhino" },
      { label: "Grasshopper", value: "Solver control, slider input, bake-back, definition introspection" },
      { label: "Platforms", value: "Windows, macOS" },
    ],
    problems: [
      {
        title: "Tolerances and units silently break geometry",
        body: "A model that assumes millimetres produces garbage in a document set to feet. Agents need the document context before they create anything.",
      },
      {
        title: "Grasshopper definitions are opaque to automation",
        body: "Agent-driven parametric work usually means scripting components blind. Without introspection, the agent cannot tell which sliders matter or which outputs to bake.",
      },
      {
        title: "Bake operations pollute the document",
        body: "Uncontrolled bake-back fills layers with unnamed geometry, breaks block definitions and makes downstream drafting unreliable.",
      },
    ],
    workflows: [
      {
        title: "Document-aware geometry",
        body: "Every geometry tool receives unit and tolerance context from doc.inspect, so a curve created by an agent lands at the radius your document expects.",
      },
      {
        title: "Grasshopper introspection",
        body: "Enumerate inputs and outputs, read slider ranges, set values, resolve, then bake specific outputs to named layers — the whole loop is scriptable and reviewable.",
      },
      {
        title: "Named-layer discipline",
        body: "Bake-back targets are declared explicitly. The agent must select or create a layer, and every inserted object carries provenance metadata.",
      },
      {
        title: "Blocks and instances, not duplicates",
        body: "Place and transform block instances instead of exploding geometry, keeping large models fast and drawings consistent.",
      },
    ],
    tools: [
      { name: "doc.inspect", description: "Units, tolerances, layers, groups, blocks, named views and object counts.", risk: "read" },
      { name: "curve.create", description: "Lines, arcs, polylines and interpolated curves with validated parameters.", risk: "write" },
      { name: "surface.loft", description: "Loft, revolve, extrude and sweep operations over typed curve inputs.", risk: "write" },
      { name: "block.instance_place", description: "Place and transform block instances with rotation and scale constraints.", risk: "write" },
      { name: "grasshopper.set_input", description: "Set slider, toggle, value-list and panel inputs by nickname with range checks.", risk: "write" },
      { name: "grasshopper.solve", description: "Trigger a solve, wait for completion and return structured output metadata.", risk: "execute" },
      { name: "grasshopper.bake", description: "Bake named outputs to explicit layers with provenance attributes.", risk: "write" },
      { name: "export.geometry", description: "Export selections to STEP, IGES, DWG, OBJ or 3MF with unit conversion.", risk: "execute" },
    ],
    install: [
      {
        title: "Install the Rhino plugin",
        body: "Install the Yak package from the Rhino Package Manager, or via the command line on build machines.",
        code: "yak install dccmcp-rhino",
      },
      {
        title: "Start the bridge",
        body: "The bridge connects your MCP client to the running Rhino document and to any open Grasshopper definitions.",
        code: "npx dccmcp-rhino@latest serve --doc active",
      },
      {
        title: "Register the server",
        body: "Register the bridge with Claude Code, Codex, Cursor, OpenClaw or any other MCP client. Point it at the running document, or let it launch Rhino headlessly for batch work.",
        code: '{\n  "mcpServers": {\n    "rhino": { "command": "npx", "args": ["dccmcp-rhino", "serve"] }\n  }\n}',
      },
      {
        title: "Bind a definition",
        body: "Point the agent at one or more .gh files so it can introspect inputs and outputs before it changes anything.",
        code: "dccmcp-rhino bind ./facade-generator.gh",
      },
    ],
    agents: [...agentClients],
    faq: [
      {
        q: "Does MCP for Rhino work with Grasshopper definitions I already have?",
        a: "Yes. Point the server at a .gh or .ghx file and it will introspect components, inputs, outputs and slider ranges. You do not need to rewrite definitions for the agent to use them.",
      },
      {
        q: "Can the agent create geometry in a document with unusual units?",
        a: "doc.inspect returns the document unit system and tolerances, and geometry tools normalize to them. If the agent requests a value that violates tolerance constraints, the call is rejected with an explanation instead of silently producing bad geometry.",
      },
      {
        q: "Is Rhino 8 required?",
        a: "No. Rhino 7 and Rhino 8 are both supported, with an early track for Rhino 9 WIP. Some Grasshopper introspection features are richer on Rhino 8 and newer.",
      },
      {
        q: "How does bake-back avoid polluting the model?",
        a: "Bake targets are explicit. The agent must declare an existing or new layer, and each inserted object gets provenance attributes naming the definition, run ID and timestamp.",
      },
      {
        q: "Can I run this on a headless build server?",
        a: "Yes. The bridge supports a headless mode for CI and batch pipelines, subject to your Rhino licensing terms for unattended use.",
      },
    ],
  },
  {
    slug: "mcp-for-freecad",
    featured: true,
    updated: "2026-09-20",
    software: "FreeCAD",
    name: "MCP for FreeCAD",
    category: "CAD & Parametric",
    status: "Beta",
    tagline: "Parametric CAD automation for agents — sketches, features, tech drawings and STEP exports.",
    summary:
      "An MCP server and FreeCAD workbench that exposes parametric modeling as typed tools: sketch constraints, Part Design features, spreadsheet parameters, technical drawings and manufacturing exports.",
    metaTitle: "MCP for FreeCAD — MCP Server for Parametric CAD Automation",
    metaDescription:
      "MCP for FreeCAD gives AI agents typed control over parametric CAD: sketches, Part Design features, spreadsheet parameters, TechDraw sheets and STEP/STL export, with reviewable tool calls.",
    primaryKeyword: "MCP for FreeCAD",
    keywords: [
      "MCP for FreeCAD",
      "MCP server for FreeCAD",
      "FreeCAD automation AI",
      "parametric CAD agent",
      "FreeCAD Python API automation",
      "open source CAD MCP",
    ],
    heroLead:
      "Parametric models are only useful if constraints survive. Agents call feature-level tools that keep the tree valid — not scripts that rebuild it from scratch.",
    specs: [
      { label: "Host software", value: "FreeCAD 0.21, 1.0 and newer" },
      { label: "Runtime", value: "Python 3.11+ with the FreeCAD Python module" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (batch servers)" },
      { label: "Install", value: "Addon Manager package + npx dccmcp-freecad" },
      { label: "Workbenches", value: "Part, Part Design, Sketcher, Spreadsheet, TechDraw, Mesh, FEM (read)" },
      { label: "Platforms", value: "Windows, macOS, Linux" },
    ],
    problems: [
      {
        title: "Scripts rebuild models instead of editing them",
        body: "Regenerating a part from code throws away design intent. Engineers need the feature tree, constraints and references to stay intact.",
      },
      {
        title: "Parametric tables drift out of sync",
        body: "When an agent hardcodes a dimension instead of binding it to the parameter spreadsheet, the model quietly stops being parametric.",
      },
      {
        title: "No traceability for manufacturing changes",
        body: "A changed bore diameter that nobody recorded is a real production risk. Unlogged automation is not acceptable on the shop floor.",
      },
    ],
    workflows: [
      {
        title: "Feature-level modeling",
        body: "The agent adds pads, pockets, revolutions and fillets as real Part Design features, so the tree stays editable by a human afterwards.",
      },
      {
        title: "Parameter binding by default",
        body: "Dimension tools accept either literals or spreadsheet aliases. The server reports when a value is unbound so the agent can fix it before the model ships.",
      },
      {
        title: "Constraint-aware sketching",
        body: "The agent reads the sketch degrees of freedom, adds geometric and dimensional constraints, and verifies the solver converges.",
      },
      {
        title: "Drawing and export pipeline",
        body: "Generate TechDraw views, then export STEP, IGES, STL or DXF with unit checks and a manifest of the exact revisions produced.",
      },
    ],
    tools: [
      { name: "document.inspect", description: "Object tree, bodies, features, parameters, recompute state and unit system.", risk: "read" },
      { name: "sketch.create", description: "Create sketches on datum planes with a scoped target body.", risk: "write" },
      { name: "sketch.constrain", description: "Add geometric and dimensional constraints, then report remaining degrees of freedom.", risk: "write" },
      { name: "partdesign.feature", description: "Pad, pocket, revolution, fillet and chamfer as first-class features in the tree.", risk: "write" },
      { name: "parameters.set", description: "Read and write spreadsheet aliases with type and range validation.", risk: "write" },
      { name: "techdraw.export", description: "Create or update drawing sheets and export to PDF or SVG.", risk: "execute" },
      { name: "cad.export", description: "Export STEP, IGES, DXF, STL or 3MF plus a revision manifest.", risk: "execute" },
      { name: "recompute.run", description: "Force a recompute and return a structured failure report instead of raising blind.", risk: "execute" },
    ],
    install: [
      {
        title: "Install the workbench",
        body: "Add the DCCMCP workbench through the FreeCAD Addon Manager, then restart FreeCAD.",
      },
      {
        title: "Start the server",
        body: "The server attaches to a running FreeCAD instance or launches one headlessly for batch conversion jobs.",
        code: "npx dccmcp-freecad@latest serve --mode attach",
      },
      {
        title: "Register with your client",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw or any other MCP client. Batch mode is useful for nightly parameter sweeps.",
        code: '{\n  "mcpServers": {\n    "freecad": { "command": "npx", "args": ["dccmcp-freecad", "serve"] }\n  }\n}',
      },
      {
        title: "Protect your parameters",
        body: "Mark spreadsheets and properties as protected so agents can read but not overwrite approved values.",
        code: "dccmcp policy protect --sheet DesignTable --write allow",
      },
    ],
    agents: [...agentClients, "CI batch runners"],
    faq: [
      {
        q: "Is FreeCAD support production-ready?",
        a: "MCP for FreeCAD is on the beta track. Read operations, sketching, Part Design features and exports are stable in our test corpus; FEM and Assembly workbenches are read-only previews for now.",
      },
      {
        q: "Does the agent keep my model parametric?",
        a: "Yes. Dimension tools prefer spreadsheet aliases, and the server reports unbound values so the agent can bind them. You can also protect specific parameters from write access entirely.",
      },
      {
        q: "Can it export manufacturing-ready files?",
        a: "STEP, IGES, DXF, STL and 3MF exports are supported, each with a revision manifest recording the parameters and file hash used for the export.",
      },
      {
        q: "Which FreeCAD versions are supported?",
        a: "FreeCAD 0.21 and 1.0+ are supported. The 1.0 line is recommended because of its improved Python API stability.",
      },
      {
        q: "Can it run headless in a container?",
        a: "Yes. Attach and headless modes are both supported, which makes parameter sweeps and nightly exports straightforward to run in CI.",
      },
    ],
  },
  {
    slug: "mcp-for-qgis",
    featured: true,
    updated: "2026-09-20",
    software: "QGIS",
    name: "MCP for QGIS",
    category: "GIS & Geospatial",
    status: "Stable",
    tagline: "Let agents run real geoprocessing — layers, CRS handling, processing algorithms and print layouts.",
    summary:
      "An MCP server and QGIS plugin that exposes PyQGIS, the processing framework and layout/atlas tooling as typed tools, so agents can analyze and publish geospatial data with full provenance.",
    metaTitle: "MCP for QGIS — QGIS MCP Integration for AI Agents",
    metaDescription:
      "MCP for QGIS connects AI agents to real GIS workflows: layer inspection, CRS-safe geoprocessing, processing algorithms, styled outputs and print layouts, with audit trails for every operation.",
    primaryKeyword: "MCP for QGIS",
    keywords: [
      "MCP for QGIS",
      "QGIS MCP integration",
      "AI agent for GIS software",
      "PyQGIS automation",
      "geoprocessing AI automation",
      "QGIS processing algorithms agent",
    ],
    heroLead:
      "Geospatial work fails quietly. CRS mismatches, invalid geometries and wrong field types produce results that look plausible and are wrong — so every operation is validated.",
    specs: [
      { label: "Host software", value: "QGIS 3.34 LTR, 3.40 and newer" },
      { label: "Runtime", value: "Python 3.11+ with the QGIS Python bindings" },
      { label: "Transport", value: "stdio (desktop) and streamable HTTP (server deployments)" },
      { label: "Install", value: "QGIS plugin + npx dccmcp-qgis" },
      { label: "Engines", value: "Processing framework, GDAL/OGR, GRASS, SAGA (when installed)" },
      { label: "Platforms", value: "Windows, macOS, Linux" },
    ],
    problems: [
      {
        title: "CRS mistakes produce confident nonsense",
        body: "Reprojecting at the wrong moment, or mixing layers in different coordinate systems, yields measurements that are wrong by orders of magnitude and still render fine.",
      },
      {
        title: "Invalid geometry breaks downstream tools",
        body: "Self-intersections and sliver polygons propagate through overlay operations until a client delivers a broken dataset.",
      },
      {
        title: "Analysis is not reproducible",
        body: "When the algorithm, parameters and input versions are not recorded, nobody can re-run last quarter's analysis and get the same answer.",
      },
    ],
    workflows: [
      {
        title: "CRS-aware by construction",
        body: "Every geometric tool declares its working CRS, and the server reprojects deterministically rather than assuming layers agree.",
      },
      {
        title: "Validation before analysis",
        body: "Geometry validity, field types and topology checks run before overlay operations, with automatic repair reported rather than hidden.",
      },
      {
        title: "Algorithm provenance",
        body: "Processing calls record the algorithm ID, parameters, QGIS version and input layer fingerprints, so results can be reproduced exactly.",
      },
      {
        title: "Publish-ready layouts",
        body: "Agents update print layouts, map extents, legends and atlas coverage layer settings, then export print-ready PDFs.",
      },
    ],
    tools: [
      { name: "project.inspect", description: "Project CRS, layer tree, data sources, styles and layout inventory.", risk: "read" },
      { name: "layer.load", description: "Load vector or raster layers from files, databases or remote services.", risk: "write" },
      { name: "layer.style_apply", description: "Apply categorized, graduated or rule-based symbology from a specification.", risk: "write" },
      { name: "crs.reproject", description: "Reproject layers or selections with explicit source and target CRS validation.", risk: "write" },
      { name: "geometry.validate", description: "Detect invalid geometry, report the failure type and optionally repair.", risk: "write" },
      { name: "processing.run", description: "Execute any registered processing algorithm with typed parameters and provenance capture.", risk: "execute" },
      { name: "sql.query", description: "Run read-only SQL against vector layers through the QGIS expression engine.", risk: "read" },
      { name: "layout.export", description: "Update layouts and atlases, then export PDF, PNG or SVG outputs.", risk: "execute" },
    ],
    install: [
      {
        title: "Install the QGIS plugin",
        body: "Install the DCCMCP plugin from the QGIS Plugin Manager and enable it in the Plugins menu.",
      },
      {
        title: "Start the server",
        body: "The server attaches to the running QGIS instance and registers the processing algorithms available in your installation.",
        code: "npx dccmcp-qgis@latest serve --project inbox.qgz",
      },
      {
        title: "Register the client",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw or any other MCP client. For shared deployments, use the HTTP transport with token auth.",
        code: '{\n  "mcpServers": {\n    "qgis": { "command": "npx", "args": ["dccmcp-qgis", "serve"] }\n  }\n}',
      },
      {
        title: "Lock the working CRS",
        body: "Define the project CRS an agent may write into so analysis cannot silently drift between coordinate systems.",
        code: "dccmcp policy crs --project EPSG:3857 --allow-read-any",
      },
    ],
    agents: [...agentClients, "Server-side automation"],
    faq: [
      {
        q: "Will the agent reproject my data without asking?",
        a: "Reprojection is its own explicit tool call and the source and target CRS are always reported. Read-only tools never modify the underlying data.",
      },
      {
        q: "Does it work with GRASS and SAGA algorithms?",
        a: "Yes. The processing framework is exposed generically, so any algorithm provider installed in your QGIS profile is discoverable by the agent.",
      },
      {
        q: "Can it publish maps automatically?",
        a: "Layouts and atlases can be updated and exported to PDF, PNG or SVG. Atlas coverage layers, filter expressions and map extents are all scriptable.",
      },
      {
        q: "How do I know what an agent changed in a project?",
        a: "Every write and execute call is recorded with the project fingerprint, the tool arguments and the resulting outputs, so a project can be diffed across sessions.",
      },
      {
        q: "Is this a cloud service?",
        a: "No. It runs against your local or self-hosted QGIS installation. There is an optional HTTP transport for shared server deployments, which stays inside your infrastructure.",
      },
    ],
  },
  {
    slug: "mcp-for-opencv",
    featured: false,
    updated: "2026-09-12",
    software: "OpenCV",
    name: "MCP for OpenCV",
    category: "Vision & Automation",
    status: "Beta",
    tagline: "Reproducible computer-vision pipelines that agents can compose, calibrate and verify.",
    summary:
      "An MCP server for OpenCV workloads that turns image processing, detection, calibration and video inspection into typed, reproducible pipeline operations instead of one-off notebook cells.",
    metaTitle: "MCP for OpenCV — MCP Server for Computer Vision Pipelines",
    metaDescription:
      "MCP for OpenCV lets AI agents compose and run computer-vision pipelines: image operations, calibration, detection, video inspection and regression checks, with deterministic parameters and artifacts.",
    primaryKeyword: "MCP for OpenCV",
    keywords: [
      "MCP for OpenCV",
      "computer vision MCP server",
      "OpenCV AI agent automation",
      "vision pipeline automation",
      "camera calibration agent",
      "AI agent for computer vision",
    ],
    heroLead:
      "Vision results are only useful if they are reproducible. Pipelines are declared as versioned graphs with fixed parameters, hashed inputs and stored artifacts.",
    specs: [
      { label: "Runtime", value: "Python 3.11+ with OpenCV 4.x / 5.x" },
      { label: "Transport", value: "stdio and streamable HTTP" },
      { label: "Install", value: "pip install dccmcp-opencv" },
      { label: "Backends", value: "CPU and CUDA-execution-provider builds" },
      { label: "Inputs", value: "Image folders, video files, RTSP streams, capture devices" },
      { label: "Platforms", value: "Linux, macOS, Windows" },
    ],
    problems: [
      {
        title: "Notebook experiments never become pipelines",
        body: "An agent writes a clever detection cell, and three weeks later nobody can reproduce the thresholds, the preprocessing order, or which images it ran on.",
      },
      {
        title: "Vision parameters are invisible",
        body: "Thresholds, kernel sizes and color-space conversions hide inside code, so results cannot be swept, compared or signed off.",
      },
      {
        title: "Failures are silent",
        body: "A pipeline that processes 4 000 images and fails on 40 of them looks successful unless someone counts the outputs.",
      },
    ],
    workflows: [
      {
        title: "Pipelines as versioned graphs",
        body: "Operations are composed into a named, versioned graph. Parameters are part of the artifact, so a run can be replayed exactly.",
      },
      {
        title: "Deterministic artifacts",
        body: "Inputs are hashed, outputs are written with manifests, and a run report lists every image that failed with the reason.",
      },
      {
        title: "Calibration as a first-class tool",
        body: "Chessboard, ChArUco and circle-grid calibration are exposed as typed tools that return intrinsic and extrinsic matrices with reprojection error.",
      },
      {
        title: "Regression on vision output",
        body: "Goldens are stored per pipeline version, so a change in preprocessing that alters detection output is caught before it reaches a customer build.",
      },
    ],
    tools: [
      { name: "image.read", description: "Load images with explicit color space, depth and orientation handling.", risk: "read" },
      { name: "image.process", description: "Composable blur, threshold, morphology, edge and color-space operations.", risk: "execute" },
      { name: "calibration.calibrate", description: "Chessboard, ChArUco and circle-grid calibration returning camera matrices and error.", risk: "execute" },
      { name: "detect.pattern", description: "Marker, contour, blob and template detection with typed result schemas.", risk: "execute" },
      { name: "pipeline.compose", description: "Build a named, versioned pipeline graph from primitive operations.", risk: "write" },
      { name: "pipeline.run", description: "Execute a pipeline over a dataset and emit a manifest with per-item status.", risk: "execute" },
      { name: "video.inspect", description: "Probe frame rate, codec, dropped frames and stream health, or sample frames.", risk: "read" },
      { name: "regression.compare", description: "Compare current outputs against stored goldens with tolerance reporting.", risk: "read" },
    ],
    install: [
      {
        title: "Install the package",
        body: "Install the server in the same environment as your vision dependencies so it can reuse your existing OpenCV build.",
        code: "pip install dccmcp-opencv",
      },
      {
        title: "Start the server",
        body: "Run the server with a workspace directory that holds your pipelines and datasets.",
        code: "dccmcp-opencv serve --workspace ./vision",
      },
      {
        title: "Register the client",
        body: "Point Claude Code, Codex, Cursor, OpenClaw or any other MCP client at the server. Agents then discover your existing pipelines before composing new ones.",
        code: '{\n  "mcpServers": {\n    "opencv": { "command": "dccmcp-opencv", "args": ["serve"] }\n  }\n}',
      },
      {
        title: "Set resource limits",
        body: "Cap worker count and memory so long-running sweeps cannot starve a workstation or a shared build agent.",
        code: "dccmcp-opencv limits --workers 4 --max-memory 8Gi",
      },
    ],
    agents: [...agentClients, "ML pipeline runners"],
    faq: [
      {
        q: "Does MCP for OpenCV replace my existing vision stack?",
        a: "No. It wraps the OpenCV build already in your environment and adds a typed, reproducible interface on top. Existing code can be exposed as a custom tool.",
      },
      {
        q: "Can it process video streams in real time?",
        a: "It can attach to RTSP streams and capture devices for inspection and sampling. For hard real-time control loops, run the generated pipeline in your own process and use DCCMCP for configuration and verification.",
      },
      {
        q: "How are failed frames handled?",
        a: "Each run writes a manifest listing processed, skipped and failed items with reasons, so partial failures are visible instead of silent.",
      },
      {
        q: "Is GPU acceleration supported?",
        a: "Yes, through CUDA-enabled OpenCV builds. The server reports which execution providers are available at startup so an agent knows what it can request.",
      },
      {
        q: "Can I expose my own functions as tools?",
        a: "Yes. Any Python callable with a typed signature can be registered as a custom tool through the plugin API, including your own models and hardware integrations.",
      },
    ],
  },
  {
    slug: "mcp-for-maya",
    featured: true,
    updated: "2026-09-20",
    software: "Maya",
    name: "MCP for Maya",
    category: "3D & Animation",
    status: "Beta",
    tagline: "Connect AI agents to Maya — scene assembly, rigging, animation curves and batch rendering.",
    summary:
      "An MCP server and Maya module that gives agents typed access to the scene graph, dependency graph wiring, references and namespaces, animation curves and headless mayapy batch jobs.",
    metaTitle: "MCP for Maya — Connect AI Agents to Maya (Claude, Cursor)",
    metaDescription:
      "MCP for Maya connects Claude, Cursor and custom agents to a real Maya session. Typed tools for scene graph, dependency graph wiring, references, rigging, animation curves and mayapy batch rendering.",
    primaryKeyword: "MCP for Maya",
    keywords: [
      "MCP for Maya",
      "Maya MCP server",
      "AI control Maya with MCP",
      "connect Claude to Maya",
      "Autodesk Maya automation AI",
      "Maya Python API automation",
    ],
    heroLead:
      "Maya scenes are graphs, references and namespaces before they are shapes. Agents work against that structure — resolving names, respecting references, and never guessing which node they just rewired.",
    specs: [
      { label: "Host software", value: "Maya 2024, 2025 and 2026" },
      { label: "Runtime", value: "Python 3.10+ (mayapy) and the Maya Python API 2.0" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (studio)" },
      { label: "Install", value: "Maya module (mod) + npx dccmcp-maya" },
      { label: "Modes", value: "Interactive session, mayapy standalone, render-farm workers" },
      { label: "Platforms", value: "Windows, macOS, Linux" },
    ],
    problems: [
      {
        title: "Namespaces quietly break every hardcoded name",
        body: "A script that works in the artist's session fails on the shot file because the reference came in as props_v003:pCube1. Agents need to resolve names before they use them, not after a traceback.",
      },
      {
        title: "One bad node graph edit corrupts the rig",
        body: "Rewiring a dependency graph connection or overwriting a driven key silently breaks a rig that took a week to build — and the damage only shows up in the next animation pass.",
      },
      {
        title: "Heavy scenes punish exploratory automation",
        body: "Agents that open, evaluate and rebuild the whole scene to answer a question are unusable on production shots. Reads have to be scoped and cheap.",
      },
    ],
    workflows: [
      {
        title: "Namespace-aware resolution",
        body: "Tools accept short or full names and resolve them against the live namespace tree, reporting the resolved path so the agent knows exactly which node it touched.",
      },
      {
        title: "Graph edits with preview",
        body: "Connection and attribute changes are returned as a diff before they are applied, and every write runs inside a checkpointed transaction.",
      },
      {
        title: "Reference-safe assembly",
        body: "The agent can inspect references and their versions, swap them deliberately, and is blocked from editing referenced content unless the policy allows it.",
      },
      {
        title: "mayapy batch parity",
        body: "The same tool surface runs in mayapy standalone for shot-wide operations, so an agent can apply a fix across a sequence without opening the UI.",
      },
    ],
    tools: [
      { name: "scene.inspect", description: "Scoped snapshot of the DAG, namespaces, references, layers and render settings.", risk: "read" },
      { name: "namespace.resolve", description: "Resolve short, ambiguous or wildcard names against the live namespace tree.", risk: "read" },
      { name: "node.create", description: "Create DAG or DG nodes with validated parenting and attribute presets.", risk: "write" },
      { name: "node.connect", description: "Wire and rewire dependency graph connections with a returned diff.", risk: "write" },
      { name: "attribute.set", description: "Set transform or custom attributes, including driven-key keys.", risk: "write" },
      { name: "reference.manage", description: "List, load, unload and version-swap references without touching referenced edits.", risk: "write" },
      { name: "animation.keyframe", description: "Read and write keyframes and tangents across selected channels.", risk: "write" },
      { name: "curve.edit", description: "Edit animation curves: scale, offset, retime and bake with explicit ranges.", risk: "write" },
      { name: "render.submit", description: "Submit renders with declared camera, range and renderer settings.", risk: "execute" },
      { name: "scene.checkpoint", description: "Create, list and restore named scene checkpoints.", risk: "write" },
    ],
    install: [
      {
        title: "Install the Maya module",
        body: "Drop the DCCMCP module into your Maya module path. Per-project module directories are supported for studios that keep tooling inside a pipeline repo.",
        code: "cp -R dccmcp-maya/ /usr/local/maya/modules/",
      },
      {
        title: "Start the bridge",
        body: "Run the bridge against the open session, or let it launch mayapy for batch work.",
        code: "npx dccmcp-maya@latest serve --session active",
      },
      {
        title: "Register the client",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw or any other MCP client. Studio builds can point at the shared HTTP transport instead.",
        code: '{\n  "mcpServers": {\n    "maya": { "command": "npx", "args": ["dccmcp-maya", "serve"] }\n  }\n}',
      },
      {
        title: "Protect referenced content",
        body: "Deny writes into referenced nodes by default so an agent cannot silently modify shared assets.",
        code: "dccmcp policy deny --tool node.create --when referenced=true",
      },
    ],
    agents: [...agentClients],
    faq: [
      {
        q: "Which Maya versions are supported?",
        a: "Maya 2024, 2025 and 2026 are supported on the beta track, using the Python 3 runtime and the Maya Python API 2.0. Python 2 / Maya 2022 and older are available to enterprise customers only.",
      },
      {
        q: "Can an agent wreck my rig?",
        a: "Graph edits and attribute writes are checkpointed and returned as a diff, referenced content is read-only by default, and a policy can deny specific node types outright — for example, anything under a rig's control group.",
      },
      {
        q: "Does it work in mayapy without the UI?",
        a: "Yes. The same tools are exposed in mayapy standalone, which is how most teams apply an approved change across an entire shot list or hand work to a render farm.",
      },
      {
        q: "How does it handle USD and references?",
        a: "References are first-class: the agent can inspect them, check versions and swap them deliberately. USD stages can be read and, with an approving policy, edited through Maya's USD integration.",
      },
      {
        q: "Is Arnold supported for rendering?",
        a: "Render submission is renderer-agnostic — the agent declares the renderer and settings, and the server validates them against what is actually installed in your session. Arnold, V-Ray and RenderMan are all used in our test corpus.",
      },
    ],
  },
  {
    slug: "mcp-for-houdini",
    featured: true,
    updated: "2026-09-18",
    software: "Houdini",
    name: "MCP for Houdini",
    category: "FX & Simulation",
    status: "Beta",
    tagline: "Let agents build and cook Houdini networks — SOPs, VEX, HDAs, PDG/TOPs and USD output.",
    summary:
      "An MCP server and Houdini package that exposes node networks, parameters, VEX snippets, digital assets, PDG/TOPs graphs and USD/Karma output as typed, checkpointed tools.",
    metaTitle: "MCP for Houdini — AI Agents for Procedural FX & Simulation",
    metaDescription:
      "MCP for Houdini gives AI agents typed control over Houdini networks: node creation, parameter binding, VEX snippets, HDA instancing, scoped cooks, PDG/TOPs graphs and USD or Karma output.",
    primaryKeyword: "MCP for Houdini",
    keywords: [
      "MCP for Houdini",
      "Houdini MCP server",
      "AI control Houdini with MCP",
      "Houdini PDG automation",
      "VEX script generation AI",
      "procedural FX automation",
    ],
    heroLead:
      "Procedural work is a graph of intent. Agents get typed access to that graph — nodes, parameters, expressions, VEX — with cooks scoped so a single question never triggers an eight-hour simulation.",
    specs: [
      { label: "Host software", value: "Houdini 20.5, 21 and newer (Core, FX, Indie)" },
      { label: "Runtime", value: "Python 3.11 via hython and the Houdini Object Model" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (farm/submitter)" },
      { label: "Install", value: "Houdini package + npx dccmcp-houdini" },
      { label: "Systems", value: "SOPs, VEX, HDAs, PDG/TOPs, USD, Karma, Mantra" },
      { label: "Platforms", value: "Windows, Linux, macOS" },
    ],
    problems: [
      {
        title: "One parameter change can trigger an eight-hour cook",
        body: "Procedural networks are only cheap until something invalidates upstream. An agent poking at random parameters can queue a simulation nobody asked for.",
      },
      {
        title: "VEX written blind is VEX that does not compile",
        body: "Generated snippets fail on type mismatches, missing attributes or the wrong run-over context — and the error surfaces deep in a cook rather than at the point of authorship.",
      },
      {
        title: "TOPs graphs are powerful and opaque",
        body: "Work items, dependencies and attributes are exactly the kind of structured state agents are good at, but only if the graph can be inspected rather than inferred.",
      },
    ],
    workflows: [
      {
        title: "Scoped cooking",
        body: "Every operation declares what may cook. The agent gets a progress stream and a cancel handle instead of a blocked session, and nothing upstream is invalidated implicitly.",
      },
      {
        title: "Parameter binding, not hardcoding",
        body: "Tools accept literal values or channel references, and the server reports which parameters remain hardcoded so procedurally intended setups stay procedural.",
      },
      {
        title: "VEX with validation",
        body: "Snippets are linted for run-over context, attribute types and missing bindings before they are written to the node, and the compile error comes back as a structured result.",
      },
      {
        title: "PDG as a typed surface",
        body: "The agent inspects work items, sets attributes and dependencies, runs a scoped subset of the graph, and reads back the failures — the same loop a TD runs by hand.",
      },
    ],
    tools: [
      { name: "network.inspect", description: "Node network structure, node types, flags, errors and warnings.", risk: "read" },
      { name: "parm.inspect", description: "Parameter values, channel references, expressions and defaults.", risk: "read" },
      { name: "node.create", description: "Create nodes in an explicit parent with validated type names.", risk: "write" },
      { name: "node.connect", description: "Wire inputs and outputs with cycle detection before the edit lands.", risk: "write" },
      { name: "parm.set", description: "Set parameter values by component, with optional channel references.", risk: "write" },
      { name: "parm.expression", description: "Set and evaluate HScript or Python expressions in context.", risk: "write" },
      { name: "vex.set_snippet", description: "Author a VEX snippet with run-over context validation and a compile check.", risk: "write" },
      { name: "hda.instantiate", description: "Instantiate digital assets and set typed, versioned parameter sets.", risk: "write" },
      { name: "geometry.cook", description: "Cook a scoped node, stream progress and return geometry statistics.", risk: "execute" },
      { name: "pdg.run", description: "Run a scoped subset of a TOP graph and return per-work-item status.", risk: "execute" },
      { name: "usd.export", description: "Export USD layers with explicit stage, root prim and unit settings.", risk: "execute" },
      { name: "cache.write", description: "Write geometry, volumes or simulation caches to declared paths.", risk: "execute" },
    ],
    install: [
      {
        title: "Install the Houdini package",
        body: "Add the DCCMCP package to your Houdini search path. Package files keep studio and project installs separate.",
        code: "export HOUDINI_PACKAGE_PATH=/studio/tools/dccmcp:$HOUDINI_PACKAGE_PATH",
      },
      {
        title: "Start the bridge",
        body: "Attach to a running session, or use hython for batch cooks on a farm node.",
        code: "npx dccmcp-houdini@latest serve --mode attach",
      },
      {
        title: "Register the client",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw or any other MCP client. Farm workers use the same entry with the HTTP transport.",
        code: '{\n  "mcpServers": {\n    "houdini": { "command": "npx", "args": ["dccmcp-houdini", "serve"] }\n  }\n}',
      },
      {
        title: "Cap the cooks",
        body: "Set cook time and memory ceilings so an agent cannot accidentally launch a full simulation on a workstation.",
        code: "dccmcp policy limits --cook-seconds 300 --memory 12Gi",
      },
    ],
    agents: [...agentClients, "Farm submitters"],
    faq: [
      {
        q: "Will an agent trigger my whole simulation by accident?",
        a: "No. Cooking is an explicit tool call with a scope, and a policy can cap cook time and memory. Reading node structure and parameter values never triggers a cook.",
      },
      {
        q: "Does it support PDG and TOPs?",
        a: "Yes. The PDG graph is exposed as structured data — work items, attributes, dependencies and results — so an agent can inspect, run a scoped subset and report failures per work item.",
      },
      {
        q: "Can it write VEX and HScript?",
        a: "It can author VEX snippets and parameter expressions, both validated before they are committed to the node. Invalid snippets come back as structured compile errors the agent can correct.",
      },
      {
        q: "Which Houdini versions and licenses are supported?",
        a: "Houdini 20.5 and 21 and newer, across Core, FX and Indie licenses. Indie users get the same tool surface; parallel cook limits follow the license you have installed.",
      },
      {
        q: "How does it integrate with a render farm?",
        a: "The same tools run under hython on a farm node, and caches, USD exports and renders are declared as paths your submitter already understands.",
      },
    ],
  },
  {
    slug: "mcp-for-3dsmax",
    featured: false,
    updated: "2026-09-16",
    software: "3ds Max",
    name: "MCP for 3ds Max",
    category: "3D & Animation",
    status: "Beta",
    tagline: "Archviz and animation automation for agents — modifiers, materials, XRefs and batch export.",
    summary:
      "An MCP server and 3ds Max plugin that exposes scene assembly, modifier stacks, material libraries, XRef scenes and render submission as typed tools, backed by Python 3 and MAXScript.",
    metaTitle: "MCP for 3ds Max — AI Automation for Archviz & Animation",
    metaDescription:
      "MCP for 3ds Max connects AI agents to scene assembly, modifier stacks, material libraries, XRef workflows and batch export. Typed tools with safety policies and audit logs for archviz and animation teams.",
    primaryKeyword: "MCP for 3ds Max",
    keywords: [
      "MCP for 3ds Max",
      "3ds Max MCP server",
      "AI control 3ds Max",
      "3ds Max automation Python",
      "archviz automation AI",
      "3ds Max MAXScript agent",
    ],
    heroLead:
      "Archviz scenes are large, layered and full of shared assets. Agents get tools that respect layers, XRefs and the modifier stack instead of flattening everything into an editable mess.",
    specs: [
      { label: "Host software", value: "3ds Max 2024, 2025 and 2026" },
      { label: "Runtime", value: "Python 3 + pymxs, with MAXScript fallback for legacy operators" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (studio)" },
      { label: "Install", value: "Plugin package + npx dccmcp-3dsmax" },
      { label: "Renderers", value: "Arnold, V-Ray, Corona (settings validated per renderer)" },
      { label: "Platforms", value: "Windows only, matching the host application" },
    ],
    problems: [
      {
        title: "Unit and scale assumptions break assemblies",
        body: "Merged interiors, imported CAD and system-unit mismatches produce models that look fine until someone measures a door. Agents need the scene's unit context before they place anything.",
      },
      {
        title: "Flattening the modifier stack destroys the edit",
        body: "Automation that collapses a stack to get a result leaves the artist with geometry they can no longer adjust, which is worse than no automation at all.",
      },
      {
        title: "XRef scenes make ownership ambiguous",
        body: "When a scene is assembled from XRefs, edits must respect what is local and what belongs to a shared asset — otherwise a change silently propagates to every project using it.",
      },
    ],
    workflows: [
      {
        title: "Layered assembly",
        body: "Objects are created into explicit layers with unit-aware dimensions, and the agent reports which layer, XRef and group each object belongs to.",
      },
      {
        title: "Non-destructive modifiers",
        body: "Modifier parameters are edited in place rather than collapsed, so the artist keeps the same control they had before the agent ran.",
      },
      {
        title: "Material library binding",
        body: "Materials are assigned from a declared library with slot and map validation, so the agent cannot invent shader parameters that the renderer will ignore.",
      },
      {
        title: "Batch export and submission",
        body: "Export deterministic sets to FBX, OBJ, USD or glTF with naming tokens, then submit renders with explicit camera and renderer settings.",
      },
    ],
    tools: [
      { name: "scene.inspect", description: "Units, layers, XRef scenes, object counts, groups and render setup.", risk: "read" },
      { name: "object.create", description: "Create primitives or merge external geometry into an explicit layer.", risk: "write" },
      { name: "modifier.apply", description: "Add or edit modifier parameters without collapsing the stack.", risk: "write" },
      { name: "material.assign", description: "Assign and parameterize materials from a declared library.", risk: "write" },
      { name: "xref.manage", description: "Inspect, merge, update and detach XRef scenes with ownership reporting.", risk: "write" },
      { name: "layer.manage", description: "Create, sort and set visibility or render flags per layer.", risk: "write" },
      { name: "batch.export", description: "Export declared selections to FBX, OBJ, USD or glTF with tokenized names.", risk: "execute" },
      { name: "render.submit", description: "Submit renders with explicit camera, frame range and renderer settings.", risk: "execute" },
      { name: "scene.checkpoint", description: "Create and restore file checkpoints before destructive operations.", risk: "write" },
    ],
    install: [
      {
        title: "Install the plugin package",
        body: "Install into the 3ds Max plugin path, or deploy through your studio's application package manager for consistent versions across workstations.",
        code: "3dsmaxbatch -U dccmcp-3dsmax.mzp",
      },
      {
        title: "Start the bridge",
        body: "Run the bridge against the open session, or against 3dsmaxbatch for automated passes.",
        code: "npx dccmcp-3dsmax@latest serve --session active",
      },
      {
        title: "Register the client",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw or any other MCP-compatible client.",
        code: '{\n  "mcpServers": {\n    "3dsmax": { "command": "npx", "args": ["dccmcp-3dsmax", "serve"] }\n  }\n}',
      },
      {
        title: "Lock the unit system",
        body: "Pin the working unit system so an agent cannot insert geometry at the wrong scale.",
        code: "dccmcp policy units --system metric --scale millimeters",
      },
    ],
    agents: [...agentClients],
    faq: [
      {
        q: "Which 3ds Max versions are supported?",
        a: "3ds Max 2024, 2025 and 2026, which ship a Python 3 runtime. Older MAXScript-only releases are supported through a reduced tool set on the enterprise track.",
      },
      {
        q: "Does it work with V-Ray, Corona and Arnold?",
        a: "Yes. Material and render tools validate settings against the renderer actually installed in the session, so an agent cannot set parameters that your renderer ignores.",
      },
      {
        q: "Can it collapse my modifier stack?",
        a: "Only if a policy explicitly permits it. The default behavior edits modifier parameters in place, which keeps the artist's control intact.",
      },
      {
        q: "How are XRef scenes handled?",
        a: "XRef ownership is reported with every object the agent inspects, and writes into shared XRef content are denied by default so a change cannot propagate across projects unnoticed.",
      },
      {
        q: "Is Linux or macOS supported?",
        a: "No. 3ds Max is a Windows-only application, so the integration follows the host and runs on Windows workstations and build machines.",
      },
    ],
  },
  {
    slug: "mcp-for-photoshop",
    featured: false,
    updated: "2026-09-14",
    software: "Photoshop",
    name: "MCP for Photoshop",
    category: "2D & Texture",
    status: "Beta",
    tagline: "Agents for texture production — layer stacks, masks, color management and PBR map export.",
    summary:
      "An MCP server and Photoshop UXP plugin that exposes documents, layers, masks, adjustment stacks, channel and profile state and batch export as typed tools for texture and marketing pipelines.",
    metaTitle: "MCP for Photoshop — AI Texture & Layer Automation for Agents",
    metaDescription:
      "MCP for Photoshop connects AI agents to layer stacks, masks, adjustment layers, color profiles and batch PBR texture export. Non-destructive by default, with checkpointed writes and audit logs.",
    primaryKeyword: "MCP for Photoshop",
    keywords: [
      "MCP for Photoshop",
      "Photoshop MCP server",
      "AI Photoshop automation",
      "texture map export automation",
      "UXP plugin AI agent",
      "batch PSD automation",
    ],
    heroLead:
      "Texture work is a naming and color-management problem before it is a visual one. Agents get tools that keep layer stacks editable and export maps your engine will actually accept.",
    specs: [
      { label: "Host software", value: "Photoshop 2024, 2025 and 2026" },
      { label: "Runtime", value: "UXP plugin (JavaScript) with an ExtendScript fallback for legacy actions" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (studio)" },
      { label: "Install", value: "UXP plugin + npx dccmcp-photoshop" },
      { label: "Documents", value: "PSD, PSB, TIFF, PNG, JPEG, EXR (via host support)" },
      { label: "Platforms", value: "Windows, macOS" },
    ],
    problems: [
      {
        title: "Automation flattens the file it was meant to speed up",
        body: "Batch scripts that flatten layers to export a PNG destroy the source PSD's editability. The artist pays for that automation for months.",
      },
      {
        title: "Texture maps arrive in the wrong color space",
        body: "Normal and roughness maps must not be sRGB-encoded, yet exports that ignore document profile produce maps that subtly break lighting in engine.",
      },
      {
        title: "Naming conventions are the whole pipeline",
        body: "A map called final_v2_NORMAL_fixed.png breaks the import. Engines want deterministic suffixes, consistent sizes and predictable channel packing.",
      },
    ],
    workflows: [
      {
        title: "Non-destructive by default",
        body: "Edits land as layers, masks and adjustment layers. Flattening, merging and destructive filters require an explicit policy approval.",
      },
      {
        title: "Color-managed export",
        body: "The agent declares the target color space per map type, and the server validates document profile and bit depth before writing the file.",
      },
      {
        title: "Tokenized texture sets",
        body: "Export a full PBR set — base color, normal, roughness, metallic, AO, height — with a naming template and consistent resolution, then write a manifest.",
      },
      {
        title: "Checkpointed documents",
        body: "A versioned checkpoint is written before mutating operations, so a bad batch can be rolled back per document rather than per folder.",
      },
    ],
    tools: [
      { name: "document.inspect", description: "Size, resolution, color mode, profile, bit depth and layer tree.", risk: "read" },
      { name: "layer.create", description: "Create pixel, fill, shape, text, group or adjustment layers in place.", risk: "write" },
      { name: "layer.effects", description: "Apply layer styles, blend modes, opacity and clipping relationships.", risk: "write" },
      { name: "mask.create", description: "Build layer and vector masks from selections, channels or alpha sources.", risk: "write" },
      { name: "selection.modify", description: "Grow, feather, invert, refine and save selections into channels.", risk: "write" },
      { name: "adjustment.apply", description: "Apply non-destructive adjustment layers with validated parameters.", risk: "write" },
      { name: "batch.action", description: "Run approved actions across a document set with per-file result reporting.", risk: "execute" },
      { name: "texture.export_set", description: "Export a tokenized PBR map set with color-space validation and a manifest.", risk: "execute" },
      { name: "asset.export", description: "Export flattened or layered output at declared sizes and formats.", risk: "execute" },
    ],
    install: [
      {
        title: "Install the UXP plugin",
        body: "Install the DCCMCP plugin through the UXP Developer Tool or your studio's extension deployment.",
        code: "uxp install ./dccmcp-photoshop.ccx",
      },
      {
        title: "Start the bridge",
        body: "The bridge connects your MCP client to the running Photoshop instance and its open documents.",
        code: "npx dccmcp-photoshop@latest serve --session active",
      },
      {
        title: "Register the client",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw or any other MCP-compatible client.",
        code: '{\n  "mcpServers": {\n    "photoshop": { "command": "npx", "args": ["dccmcp-photoshop", "serve"] }\n  }\n}',
      },
      {
        title: "Declare your map convention",
        body: "Tell the server which suffixes and color spaces your engine expects so exports are validated against them.",
        code: "dccmcp texture set --template \"{name}_{map}_{res}.png\" --linear normal,roughness,metallic,ao,height",
      },
    ],
    agents: [...agentClients],
    faq: [
      {
        q: "Does MCP for Photoshop use Adobe's generative AI features?",
        a: "No. The integration does not invoke Firefly or any generative feature. It exposes document, layer, mask, color-management and export operations only, so your files are never sent to a generative model through us.",
      },
      {
        q: "Will it flatten my PSD files?",
        a: "Not unless a policy allows it. Edits are made with layers, masks and adjustment layers, and destructive operations such as flatten or merge are denied by default.",
      },
      {
        q: "Which Photoshop versions are supported?",
        a: "Photoshop 2024, 2025 and 2026, using the UXP plugin architecture. Legacy ExtendScript actions can still be run through the batch tool for compatibility.",
      },
      {
        q: "Can it prepare texture sets for Unreal or Unity?",
        a: "Yes. The texture export tool writes a full map set with your naming template, validates linear versus color data per map type, and produces a manifest listing every file it wrote at what resolution.",
      },
      {
        q: "Is this affiliated with Adobe?",
        a: "No. DCCMCP is an independent third-party integration and is not affiliated with, endorsed by or sponsored by Adobe.",
      },
    ],
  },
  {
    slug: "mcp-for-zbrush",
    featured: false,
    updated: "2026-09-10",
    software: "ZBrush",
    name: "MCP for ZBrush",
    category: "Sculpting & Texturing",
    status: "Preview",
    tagline: "Sculpting pipeline automation — subtool management, remeshing, UV prep and GoZ handoff.",
    summary:
      "An MCP server and ZScript bridge for ZBrush that exposes subtool inventory, remeshing and decimation, polygroup operations, polypaint baking and GoZ handoff as typed tools.",
    metaTitle: "MCP for ZBrush — AI Subtool, Remesh & GoZ Automation",
    metaDescription:
      "MCP for ZBrush lets AI agents manage subtools, run ZRemesher and DynaMesh at declared resolutions, bake polypaint to texture maps and hand meshes to other tools through GoZ.",
    primaryKeyword: "MCP for ZBrush",
    keywords: [
      "MCP for ZBrush",
      "ZBrush MCP server",
      "AI ZBrush automation",
      "ZRemesher automation",
      "ZBrush subtool management",
      "GoZ pipeline automation",
    ],
    heroLead:
      "Sculpt files grow into hundreds of subtools with unpredictable polycounts. Agents get an honest inventory and explicit resolution targets, so remeshing is a decision rather than a gamble.",
    specs: [
      { label: "Host software", value: "ZBrush 2024, 2025 and newer (desktop)" },
      { label: "Runtime", value: "ZScript bridge with a companion process for mesh statistics and baking" },
      { label: "Transport", value: "stdio (local) and streamable HTTP (studio)" },
      { label: "Install", value: "ZStartup script + npx dccmcp-zbrush" },
      { label: "Exchange", value: "GoZ handoff to Maya, Blender, 3ds Max and ZBrush plugins" },
      { label: "Platforms", value: "Windows, macOS" },
    ],
    problems: [
      {
        title: "Subtool sprawl makes files unmanageable",
        body: "A character file with 180 subtools and no naming discipline is a production risk. Nobody knows which subtool is current, what it was named for, or how heavy it is.",
      },
      {
        title: "Remeshing decisions are irreversible and expensive",
        body: "ZRemesher target counts and DynaMesh resolutions change topology permanently. A wrong number means redoing hours of sculpt detail work.",
      },
      {
        title: "Polypaint never reaches the engine",
        body: "The detail lives in vertex color until someone bakes it to texture maps — and a bake done at the wrong resolution wastes another pass.",
      },
    ],
    workflows: [
      {
        title: "Subtool inventory first",
        body: "The agent reads every subtool with its polycount, visibility, folder and material before proposing anything, so naming and polycount problems surface immediately.",
      },
      {
        title: "Declared resolution targets",
        body: "Remeshing and decimation require an explicit target — polygon count or edge length — and the tool returns the actual result, so the change is measured rather than assumed.",
      },
      {
        title: "Polygroup-aware operations",
        body: "Split, merge, group and visibility operations work against named polygroups, which keeps hard-surface and soft-surface parts separable.",
      },
      {
        title: "GoZ handoff",
        body: "Send a selected subtool to Maya, Blender or 3ds Max at a declared subdivision level, with the round trip recorded in the audit log.",
      },
    ],
    tools: [
      { name: "tool.inspect", description: "Active tool, subtool list, polycounts, visibility, folders and materials.", risk: "read" },
      { name: "subtool.create", description: "Duplicate, split, append or delete subtools with explicit targets.", risk: "write" },
      { name: "subtool.folder", description: "Organize subtools into named folders and set visibility states.", risk: "write" },
      { name: "dynamesh.remesh", description: "Run DynaMesh at a declared resolution and return the resulting polycount.", risk: "write" },
      { name: "zremesher.retopo", description: "Retopologize to a target count or edge length with symmetry settings.", risk: "write" },
      { name: "decimate.ratio", description: "Decimate to a declared polygon budget for export or baking.", risk: "write" },
      { name: "polygroup.manage", description: "Create, expand and split polygroups for hard-surface separation.", risk: "write" },
      { name: "uv.unwrap", description: "Run UV Master unwrapping with island and resolution parameters.", risk: "write" },
      { name: "texture.bake", description: "Bake polypaint and sculpted detail to texture maps at a declared size.", risk: "execute" },
      { name: "goz.send", description: "Hand off a subtool to another application at a declared subdivision level.", risk: "execute" },
    ],
    install: [
      {
        title: "Install the ZStartup script",
        body: "Drop the DCCMCP script into your ZBrush ZStartup folder so the bridge loads with the application.",
        code: "cp dccmcp_zbrush.txt \"$ZBRUSH/ZStartup/\"",
      },
      {
        title: "Start the bridge",
        body: "The bridge coordinates ZScript commands with the companion process that computes mesh statistics and bakes.",
        code: "npx dccmcp-zbrush@latest serve --companion",
      },
      {
        title: "Register the client",
        body: "Register the server with Claude Code, Codex, Cursor, OpenClaw or any other MCP-compatible client.",
        code: '{\n  "mcpServers": {\n    "zbrush": { "command": "npx", "args": ["dccmcp-zbrush", "serve"] }\n  }\n}',
      },
      {
        title: "Set a polycount ceiling",
        body: "Cap the polygon budget an agent may request so a retopology pass cannot push a subtool past what your downstream tools can open.",
        code: "dccmcp policy limits --max-polygons 8000000",
      },
    ],
    agents: [...agentClients],
    faq: [
      {
        q: "Is MCP for ZBrush production-ready?",
        a: "It is on the preview track. Reading subtool structure, remeshing at declared targets, decimation and GoZ handoff are stable in our test corpus. Texture baking is newer and we recommend validating it against your own material setup before relying on it.",
      },
      {
        q: "Why does it need a companion process?",
        a: "ZBrush's scripting surface does not expose everything an agent needs, particularly accurate post-operation statistics and bake results. A local companion process computes those and reports back, which keeps the tool results trustworthy.",
      },
      {
        q: "Does it work with ZBrush for iPad?",
        a: "No. The integration targets the desktop application. ZBrush for iPad does not expose the scripting surface this bridge depends on.",
      },
      {
        q: "Can an agent destroy sculpt detail by remeshing accidentally?",
        a: "Remeshing requires an explicit target, runs as a checkpointed operation, and can be denied outright by policy on specific tools or files. Restores are scoped to a subtool where the host allows it.",
      },
      {
        q: "Which applications can it hand off to?",
        a: "GoZ handoff covers Maya, Blender, 3ds Max and any other application with a GoZ bridge installed, at a subdivision level the agent declares.",
      },
    ],
  },
];

export function getIntegration(slug: string) {
  return integrations.find((item) => item.slug === slug);
}


/** Display order used by the integrations hub. */
export const categoryOrder: Integration["category"][] = [
  "3D & Animation",
  "CAD & Parametric",
  "FX & Simulation",
  "Sculpting & Texturing",
  "2D & Texture",
  "GIS & Geospatial",
  "Vision & Automation",
];

export function featuredIntegrations() {
  return integrations.filter((item) => item.featured);
}

export function integrationsByCategory() {
  return categoryOrder
    .map((category) => ({
      category,
      items: integrations.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);
}

/** Related pages: same category first, then the rest — good for internal linking. */
export function relatedIntegrations(slug: string, limit = 3) {
  const current = getIntegration(slug);
  if (!current) return integrations.slice(0, limit);
  const sameCategory = integrations.filter(
    (item) => item.slug !== slug && item.category === current.category,
  );
  const others = integrations.filter(
    (item) => item.slug !== slug && item.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const toolCount = integrations.reduce((total, item) => total + item.tools.length, 0);
