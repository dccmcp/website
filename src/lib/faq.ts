export type FaqItem = { q: string; a: string };

export const homeFaq: FaqItem[] = [
  {
    q: "What is MCP, and why does it matter for 3D and engineering software?",
    a: "The Model Context Protocol is a standard way for AI agents to discover and call tools. Applied to creative and engineering software, it replaces one-off generated scripts with a stable, reviewable interface — so an agent works against a contract instead of guessing at an API.",
  },
  {
    q: "Which AI agents are supported?",
    a: "Any MCP-compatible client. We verify Claude Code, Cursor, Codex, GitHub Copilot, Claude Desktop, Gemini CLI, Windsurf, Cline, Roo Code, Trae, Doubao, Qwen Code, Kimi, Zhipu GLM, CodeBuddy, Yuanbao, Lingma, Qoder, Continue, Zed, JetBrains AI, Goose, Warp, Coze, CodeGeeX, Comate, ERNIE, Spark, MiniMax Agent, OpenClaw and WorkBuddy against each release. Agents you build yourself on the MCP SDK get the same typed tools, over stdio or streamable HTTP.",
  },
  {
    q: "Does my model or project data leave my machine?",
    a: "Not on Community or Studio. The server runs locally next to your application and only the tool results an agent requested are passed to your model provider. Enterprise deployments can run fully self-hosted or air-gapped.",
  },
  {
    q: "Which host application versions are supported?",
    a: "Blender 4.2 LTS and newer, Maya 2024+, Houdini 20.5+, 3ds Max 2024+, Rhino 7 and 8, ZBrush 2024+, Photoshop 2024+, FreeCAD 0.21 and 1.0+, QGIS 3.34 LTR and newer, and OpenCV 4.x/5.x. Each integration page lists the exact support matrix, and legacy versions are available on the enterprise track.",
  },
  {
    q: "Can I build an integration for software you do not support yet, like Revit or Civil 3D?",
    a: "Yes. The Skills SDK lets you register your own typed tools against any Python or .NET surface, and enterprise customers can commission fully maintained private bridges.",
  },
  {
    q: "How is this different from open-source MCP projects?",
    a: "We focus on the operational layer that production pipelines need: policy enforcement, approval gates, checkpointed writes, audit trails, multi-instance control and vendor-version support. Where open-source components are useful, we use and credit them — with a clear separation between our commercial product and any open-source dependency.",
  },
];
