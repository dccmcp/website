"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle, PaperPlaneTilt, CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const softwareOptions = [
  "Blender",
  "Rhino / Grasshopper",
  "FreeCAD",
  "QGIS",
  "OpenCV",
  "Something else / in-house",
];

const teamSizes = ["Just me", "2–10", "11–50", "51–200", "200+"];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          teamSize: data.get("teamSize"),
          software: data.getAll("software"),
          message: data.get("message"),
          honey: data.get("honey"),
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok) {
        setStatus("error");
        setFieldErrors(payload.fields ?? {});
        setMessage(
          payload.message ??
            "Something went wrong sending that. Email support@dccmcp.com and we will pick it up from there.",
        );
        return;
      }

      setStatus("success");
      setMessage("Received. We reply to every enterprise enquiry within one business day.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the server. Email support@dccmcp.com and we will continue over email.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" error={fieldErrors.name} required />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          error={fieldErrors.email}
          required
        />
        <Field label="Company" name="company" autoComplete="organization" />
        <label className="flex flex-col gap-2">
          <span className="text-[12.5px] font-medium text-fg">Team size</span>
          <select
            name="teamSize"
            defaultValue="2–10"
            className="h-11 rounded-lg border border-line bg-panel px-3 text-[14px] text-fg transition-colors outline-none focus:border-mint/60"
          >
            {teamSizes.map((size) => (
              <option key={size} value={size} className="bg-panel text-fg">
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-[12.5px] font-medium text-fg">
          Which software are you connecting?
        </legend>
        <div className="flex flex-wrap gap-2">
          {softwareOptions.map((option) => (
            <label
              key={option}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-muted transition-colors has-checked:border-mint/50 has-checked:bg-mint/10 has-checked:text-mint-bright hover:border-line"
            >
              <input
                type="checkbox"
                name="software"
                value={option}
                className="checkbox-mint h-4 w-4 shrink-0 appearance-none rounded-[4px] border border-line bg-ink transition-colors checked:border-mint"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-[12.5px] font-medium text-fg">
          What are you trying to deploy?
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Team, pipeline, the software involved, and what you want an agent to be allowed to do."
          className={cn(
            "resize-y rounded-lg border bg-panel px-3.5 py-3 text-[14px] leading-relaxed text-fg transition-colors outline-none placeholder:text-muted/80 focus:border-mint/60",
            fieldErrors.message ? "border-rose-400/60" : "border-line",
          )}
        />
        {fieldErrors.message ? (
          <span className="text-[12px] text-rose-300">{fieldErrors.message}</span>
        ) : null}
      </label>

      {/* Honeypot — hidden from users, irresistible to bots. */}
      <input
        type="text"
        name="honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <CircleNotch className="h-4 w-4 animate-spin" weight="bold" />
              Sending
            </>
          ) : (
            <>
              <PaperPlaneTilt className="h-4 w-4" weight="bold" />
              Send enquiry
            </>
          )}
        </Button>
        <p className="text-[12px] text-muted">
          Or email{" "}
          <a className="text-mint hover:text-mint-bright" href="mailto:support@dccmcp.com">
            support@dccmcp.com
          </a>
        </p>
      </div>

      <div aria-live="polite">
        {status === "success" ? (
          <p className="flex items-start gap-2.5 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-[13px] text-success">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" weight="fill" />
            {message}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-2.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[13px] text-amber-100">
            <WarningCircle className="mt-0.5 h-4 w-4 shrink-0" weight="fill" />
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] font-medium text-fg">
        {label}
        {required ? <span className="text-mint"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        className={cn(
          "h-11 rounded-lg border bg-panel px-3.5 text-[14px] text-fg transition-colors outline-none placeholder:text-muted/80 focus:border-mint/60",
          error ? "border-rose-400/60" : "border-line",
        )}
      />
      {error ? <span className="text-[12px] text-rose-300">{error}</span> : null}
    </label>
  );
}
