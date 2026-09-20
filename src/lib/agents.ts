export type AgentSupport = {
  name: string;
  vendor: string;
  /** Slug into the vendored LobeHub icon set; falls back to a generic glyph. */
  icon?: string;
  /** Optional label rendered on the right of the card. Keep to 2–3 words. */
  note?: string;
};

/**
 * Agent clients we verify against, ordered by how often we see them in studio
 * and engineering pipelines. DCCMCP is an MCP server, so compatibility is a
 * property of the protocol rather than of any single vendor — this list is the
 * set we test each release, not a closed one.
 */
export const agents: AgentSupport[] = [
  { name: "Claude Code", vendor: "Anthropic", icon: "anthropic", note: "Terminal agent" },
  { name: "Cursor", vendor: "Anysphere", icon: "cursor" },
  { name: "Codex", vendor: "OpenAI", icon: "openai", note: "CLI + IDE" },
  { name: "GitHub Copilot", vendor: "GitHub", icon: "githubcopilot" },
  { name: "Claude Desktop", vendor: "Anthropic", icon: "claude" },
  { name: "Gemini CLI", vendor: "Google", icon: "gemini" },
  { name: "Windsurf", vendor: "Cognition", icon: "windsurf" },
  { name: "Cline", vendor: "Open source", icon: "cline" },
  { name: "Roo Code", vendor: "Open source", icon: "roocode" },
  { name: "Trae", vendor: "ByteDance", icon: "trae", note: "Agentic IDE" },
  { name: "Doubao", vendor: "ByteDance", icon: "doubao", note: "Assistant app" },
  { name: "Qwen Code", vendor: "Alibaba", icon: "qwen", note: "CLI agent" },
  { name: "Kimi", vendor: "Moonshot AI", icon: "kimi" },
  { name: "Zhipu GLM", vendor: "Zhipu AI", icon: "zhipu" },
  { name: "CodeBuddy", vendor: "Tencent", icon: "codebuddy" },
  { name: "Yuanbao", vendor: "Tencent", icon: "yuanbao" },
  { name: "Lingma", vendor: "Alibaba", icon: "alibaba" },
  { name: "Qoder", vendor: "Alibaba", icon: "qoder" },
  { name: "Continue", vendor: "Open source" },
  { name: "Zed", vendor: "Zed Industries" },
  { name: "JetBrains AI", vendor: "JetBrains" },
  { name: "Goose", vendor: "Block", icon: "goose" },
  { name: "Warp", vendor: "Warp" },
  { name: "Coze", vendor: "ByteDance", icon: "coze", note: "Agent platform" },
  { name: "CodeGeeX", vendor: "Zhipu AI", icon: "codegeex" },
  { name: "Comate", vendor: "Baidu" },
  { name: "ERNIE", vendor: "Baidu", icon: "baidu" },
  { name: "Spark", vendor: "iFlytek", icon: "spark" },
  { name: "MiniMax Agent", vendor: "MiniMax", icon: "minimax" },
  { name: "OpenClaw", vendor: "Open source", icon: "openclaw", note: "Self-hosted gateway" },
  { name: "WorkBuddy", vendor: "Independent" },
  { name: "Your own agent", vendor: "MCP SDK", note: "Any language" },
];

/** Short list reused in the per-integration "supported agents" fields. */
export const agentClients = [
  "Claude Code",
  "Codex",
  "Cursor",
  "GitHub Copilot",
  "Claude Desktop",
  "Gemini CLI",
  "Trae",
  "Doubao",
  "Qwen Code",
  "CodeBuddy",
  "Custom MCP clients",
];

/**
 * Resolve a client label stored in an integration record (for example
 * "MCP SDK agents") back to a brand icon slug.
 */
export function agentIconFor(label: string): string | undefined {
  const found = agents.find(
    (agent) => agent.name === label || label.startsWith(agent.name),
  );
  return found?.icon;
}
