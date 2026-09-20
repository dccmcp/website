import { ArrowRight, Robot, Clock } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { agents, agentClients } from "@/lib/agents";
import { BrandIcon } from "@/components/site/brand-icon";

export function Agents() {
  return (
    <Section id="agents" className="border-b border-line/60">
      <SectionHeading
        eyebrow="Agents"
        title="Works with the agent you already use"
        description={
          <>
            DCCMCP servers speak the Model Context Protocol over stdio and streamable HTTP, so any
            MCP-compatible client can drive Blender, Maya, Houdini, Photoshop and the rest — there is
            no vendor-specific plugin to write and nothing to learn beyond adding a server. The
            clients below are the ones we verify each release; they are ordered by how often we see
            them in production pipelines.
          </>
        }
      />

      <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => (
          <StaggerItem key={agent.name}>
            <div className="flex h-full items-center gap-3.5 rounded-xl border border-line bg-panel px-4 py-3.5 transition-colors duration-300 hover:border-mint/30 hover:bg-panel-raised">
              <BrandIcon slug={agent.icon} />
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[14px] font-medium text-fg">{agent.name}</span>
                <span className="truncate font-mono text-[11px] text-muted">{agent.vendor}</span>
              </div>
              {agent.note ? (
                <span className="ml-auto hidden shrink-0 pl-2 text-right text-[11px] whitespace-nowrap text-muted/80 xl:block">
                  {agent.note}
                </span>
              ) : null}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-6">
        <div className="flex flex-col gap-5 rounded-2xl border border-line bg-panel-raised p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <Robot className="mt-0.5 h-6 w-6 shrink-0 text-mint" weight="duotone" aria-hidden="true" />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[16px] font-medium text-fg">
                Not on the list? If it speaks MCP, it works
              </h3>
              <p className="max-w-[70ch] text-[13.5px] leading-relaxed text-muted">
                Add the server exactly the way you add any other MCP server: one config entry, stdio
                by default, streamable HTTP with token auth for a shared studio deployment. Custom
                agents built on the MCP SDK get the same typed tools.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="/docs#clients" variant="outline">
              Client setup
              <ArrowRight className="h-4 w-4" weight="bold" />
            </ButtonLink>
            <ButtonLink href="/download" variant="outline">
              <Clock className="h-4 w-4" weight="bold" />
              Coming soon
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 max-w-[80ch] text-[12px] leading-relaxed text-muted/80">
        MCP support is implemented by each client, not by us. Where a client lets you add an MCP
        server, add the DCCMCP entry and the tools appear — the same config works in every client
        listed above.
      </p>

      <p className="sr-only">
        Supported agent clients include {agentClients.join(", ")}.
      </p>
    </Section>
  );
}
