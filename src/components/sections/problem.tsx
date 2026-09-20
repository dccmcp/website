import { Warning, FileCode, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeading, Container } from "@/components/ui/section";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const problems = [
  {
    icon: FileCode,
    title: "The model writes a script it has never run",
    body: "Ask an agent for bpy or PyQGIS code and it guesses. Object names, collection paths, units, tolerances — none of it is verified against your file. You find out at the traceback, halfway through a change.",
  },
  {
    icon: Warning,
    title: "One bad call costs an afternoon",
    body: "A destructive operator without a checkpoint can corrupt a scene, break linked libraries or invalidate a parametric tree. There is no undo for the two hours before it.",
  },
  {
    icon: EyeSlash,
    title: "Nobody can prove what changed",
    body: "Unattended automation with no record of who changed what, when and with which arguments cannot pass studio sign-off, client review or a manufacturing audit.",
  },
];

export function Problem() {
  return (
    <Section id="problem" className="border-b border-line/60">
      <SectionHeading
        eyebrow="The problem"
        title="Why most AI-to-DCC integrations fail in production"
        description={
          <>
            Letting a model write software-specific Python is easy to demo and expensive to own.
            The failure is never the model&apos;s ability to write code — it is the absence of a
            contract between the agent and the application.
          </>
        }
      />

      <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-3">
        {problems.map((problem, index) => (
          <StaggerItem
            key={problem.title}
            className="group relative flex flex-col gap-4 bg-panel p-6 transition-colors duration-300 hover:bg-panel-raised"
          >
            <span className="font-mono text-[11px] text-muted/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <problem.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
            <h3 className="text-balance-tight text-lg font-medium text-fg">{problem.title}</h3>
            <p className="text-[14px] leading-relaxed text-muted">{problem.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Container className="mt-8 px-0">
        <p className="max-w-[74ch] border-l-2 border-mint/50 pl-4 text-[14.5px] leading-relaxed text-muted">
          The hidden cost of &ldquo;just let the model write a Python script&rdquo; is not the
          generation. It is the debugging, the review burden, the corrupted-file incidents and the
          audit trail that does not exist when anyone asks what happened on Thursday.
        </p>
      </Container>
    </Section>
  );
}
