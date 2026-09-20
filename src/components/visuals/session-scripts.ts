export type SessionLine =
  | { kind: "prompt"; text: string }
  | { kind: "call"; tool: string; args: string }
  | { kind: "result"; text: string; detail?: string }
  | { kind: "ok"; text: string; detail?: string };

export type Session = {
  slug: string;
  software: string;
  /** Short label for the viewport chrome. */
  window: string;
  /** Route the tab links to. */
  href: string;
  lines: SessionLine[];
};

export const sessions: Session[] = [
  {
    slug: "blender",
    software: "Blender",
    window: "facade_module_01.blend",
    href: "/mcp-for-blender",
    lines: [
      { kind: "prompt", text: "Build three facade variants with 20 / 40 / 60 mm window insets." },
      { kind: "call", tool: "scene.inspect", args: "{ depth: \"collections\" }" },
      { kind: "result", text: "42 objects · 6 collections", detail: "units: metric, 1.0" },
      { kind: "call", tool: "geometry_nodes.set_input", args: '{ socket: "Inset", value: 0.02 }' },
      { kind: "result", text: "socket type Length validated", detail: "Modifier: FacadeGN" },
      { kind: "call", tool: "render.capture", args: "{ samples: 64 }" },
      { kind: "ok", text: "3 variants rendered", detail: "checkpoint facade-a1.ckpt" },
    ],
  },
  {
    slug: "rhino",
    software: "Rhino",
    window: "terrace_study.3dm",
    href: "/mcp-for-rhino",
    lines: [
      { kind: "prompt", text: "Loft the terrace surface from the three section curves." },
      { kind: "call", tool: "doc.inspect", args: "{ scope: \"units\" }" },
      { kind: "result", text: "millimeters · tolerance 0.001", detail: "18 layers, 4 blocks" },
      { kind: "call", tool: "surface.loft", args: '{ curves: "Sections::Terrace", degree: 3 }' },
      { kind: "result", text: "1 surface · deviation 0.004 mm", detail: "closed: false" },
      { kind: "call", tool: "grasshopper.bake", args: '{ output: "Surface", layer: "Terrace::Built" }' },
      { kind: "ok", text: "Surface committed", detail: "provenance written to 1 object" },
    ],
  },
  {
    slug: "freecad",
    software: "FreeCAD",
    window: "bracket_assembly.FCStd",
    href: "/mcp-for-freecad",
    lines: [
      { kind: "prompt", text: "Increase the bore to 42 mm and regenerate the drawing." },
      { kind: "call", tool: "document.inspect", args: "{ tree: \"features\" }" },
      { kind: "result", text: "PartDesign Body · 14 features", detail: "3 spreadsheets bound" },
      { kind: "call", tool: "parameters.set", args: '{ alias: "Bore_Dia", value: 42 }' },
      { kind: "result", text: "alias resolved · type Length", detail: "no unbound dimensions" },
      { kind: "call", tool: "recompute.run", args: "{}" },
      { kind: "result", text: "14 features recomputed · 0 errors", detail: "constraint solver converged" },
      { kind: "call", tool: "techdraw.export", args: '{ sheet: "DRAWING-A2", format: "pdf" }' },
      { kind: "ok", text: "Revision B exported", detail: "manifest: params + file hash" },
    ],
  },
  {
    slug: "qgis",
    software: "QGIS",
    window: "flood_risk_2026.qgz",
    href: "/mcp-for-qgis",
    lines: [
      { kind: "prompt", text: "Clip parcels to the flood extent and export the atlas." },
      { kind: "call", tool: "project.inspect", args: "{ layers: true }" },
      { kind: "result", text: "6 layers · CRS EPSG:3857", detail: "2 raster, 4 vector" },
      { kind: "call", tool: "geometry.validate", args: '{ repair: true }' },
      { kind: "result", text: "12 invalid geometries repaired", detail: "self-intersection, slivers" },
      { kind: "call", tool: "processing.run", args: '{ algorithm: "native:clip" }' },
      { kind: "result", text: "4,318 features in result", detail: "algo + params recorded" },
      { kind: "call", tool: "layout.export", args: '{ atlas: true, format: "pdf" }' },
      { kind: "ok", text: "24 atlas sheets exported", detail: "provenance attached" },
    ],
  },
  {
    slug: "opencv",
    software: "OpenCV",
    window: "line-inspection-v4",
    href: "/mcp-for-opencv",
    lines: [
      { kind: "prompt", text: "Calibrate the rig, then run the defect pipeline over today's frames." },
      { kind: "call", tool: "calibration.calibrate", args: '{ board: "charuco", images: 32 }' },
      { kind: "result", text: "RMS reprojection error 0.28 px", detail: "intrinsics stored" },
      { kind: "call", tool: "pipeline.compose", args: '{ ops: 9, version: "v4" }' },
      { kind: "result", text: "pipeline versioned", detail: "params hashed" },
      { kind: "call", tool: "pipeline.run", args: '{ dataset: "frames/today" }' },
      { kind: "result", text: "4,000 frames · 6 failed", detail: "failures listed in manifest" },
      { kind: "ok", text: "Run manifest + goldens stored", detail: "regression baseline updated" },
    ],
  },
];
