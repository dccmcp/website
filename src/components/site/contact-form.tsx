"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle, PaperPlaneTilt, CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactFormLocale = "en" | "zh";

/**
 * Copy for the enquiry form. `value` is what gets POSTed to /api/contact and
 * stays in English in every locale so the transport keeps parsing it the same
 * way regardless of which site the visitor submitted from.
 */
const copy = {
  en: {
    name: "Name",
    workEmail: "Work email",
    company: "Company",
    teamSize: "Team size",
    softwareLegend: "Which software are you connecting?",
    softwareOptions: [
      { value: "Blender", label: "Blender" },
      { value: "Rhino / Grasshopper", label: "Rhino / Grasshopper" },
      { value: "FreeCAD", label: "FreeCAD" },
      { value: "QGIS", label: "QGIS" },
      { value: "OpenCV", label: "OpenCV" },
      { value: "Something else / in-house", label: "Something else / in-house" },
    ],
    teamSizes: [
      { value: "Just me", label: "Just me" },
      { value: "2\u201310", label: "2\u201310" },
      { value: "11\u201350", label: "11\u201350" },
      { value: "51\u2013200", label: "51\u2013200" },
      { value: "200+", label: "200+" },
    ],
    messageLabel: "What are you trying to deploy?",
    messagePlaceholder:
      "Team, pipeline, the software involved, and what you want an agent to be allowed to do.",
    send: "Send enquiry",
    sending: "Sending",
    orEmail: "Or email",
    success: "Received. We reply to every enterprise enquiry within one business day.",
    genericError:
      "Something went wrong sending that. Email support@dccmcp.com and we will pick it up from there.",
    networkError:
      "We could not reach the server. Email support@dccmcp.com and we will continue over email.",
    fieldErrors: {
      name: "Please enter your name.",
      email: "Please enter a valid work email address.",
      message: "Please describe what you are trying to deploy.",
    } as Record<string, string>,
  },
  zh: {
    name: "姓名",
    workEmail: "工作邮箱",
    company: "公司",
    teamSize: "团队规模",
    softwareLegend: "你要接入哪些软件？",
    softwareOptions: [
      { value: "Blender", label: "Blender" },
      { value: "Rhino / Grasshopper", label: "Rhino / Grasshopper" },
      { value: "FreeCAD", label: "FreeCAD" },
      { value: "QGIS", label: "QGIS" },
      { value: "OpenCV", label: "OpenCV" },
      { value: "Something else / in-house", label: "其他软件 / 自研工具" },
    ],
    teamSizes: [
      { value: "Just me", label: "只有我" },
      { value: "2\u201310", label: "2\u201310 人" },
      { value: "11\u201350", label: "11\u201350 人" },
      { value: "51\u2013200", label: "51\u2013200 人" },
      { value: "200+", label: "200 人以上" },
    ],
    messageLabel: "你想部署什么？",
    messagePlaceholder: "团队、流水线、涉及的软件，以及你希望 Agent 被允许做什么。",
    send: "发送咨询",
    sending: "发送中",
    orEmail: "或者直接写邮件到",
    success: "已收到。我们会在一个工作日内回复每一封企业咨询。",
    genericError: "发送出了点问题。请写信到 support@dccmcp.com，我们会接着处理。",
    networkError: "无法连上服务器。请写信到 support@dccmcp.com，我们继续用邮件沟通。",
    fieldErrors: {
      name: "请填写你的姓名。",
      email: "请填写有效的工作邮箱。",
      message: "请描述一下你想部署的内容。",
    } as Record<string, string>,
  },
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ locale = "en" }: { locale?: ContactFormLocale }) {
  const t = copy[locale];
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
        // Field messages come back from the API in English; substitute the
        // local wording for the keys we know about.
        const fields = payload.fields ?? {};
        setFieldErrors(
          Object.fromEntries(
            Object.entries(fields).map(([key, value]) => [key, t.fieldErrors[key] ?? value]),
          ),
        );
        setMessage(payload.message ?? t.genericError);
        return;
      }

      setStatus("success");
      setMessage(t.success);
      form.reset();
    } catch {
      setStatus("error");
      setMessage(t.networkError);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t.name}
          name="name"
          autoComplete="name"
          error={fieldErrors.name}
          required
        />
        <Field
          label={t.workEmail}
          name="email"
          type="email"
          autoComplete="email"
          error={fieldErrors.email}
          required
        />
        <Field label={t.company} name="company" autoComplete="organization" />
        <label className="flex flex-col gap-2">
          <span className="text-[12.5px] font-medium text-fg">{t.teamSize}</span>
          <select
            name="teamSize"
            defaultValue="2–10"
            className="h-11 rounded-lg border border-line bg-panel px-3 text-[14px] text-fg transition-colors outline-none focus:border-mint/60"
          >
            {t.teamSizes.map((size) => (
              <option key={size.value} value={size.value} className="bg-panel text-fg">
                {size.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-[12.5px] font-medium text-fg">{t.softwareLegend}</legend>
        <div className="flex flex-wrap gap-2">
          {t.softwareOptions.map((option) => (
            <label
              key={option.value}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-muted transition-colors has-checked:border-mint/50 has-checked:bg-mint/10 has-checked:text-mint-bright hover:border-line"
            >
              <input
                type="checkbox"
                name="software"
                value={option.value}
                className="checkbox-mint h-4 w-4 shrink-0 appearance-none rounded-[4px] border border-line bg-ink transition-colors checked:border-mint"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-[12.5px] font-medium text-fg">{t.messageLabel}</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder={t.messagePlaceholder}
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
              {t.sending}
            </>
          ) : (
            <>
              <PaperPlaneTilt className="h-4 w-4" weight="bold" />
              {t.send}
            </>
          )}
        </Button>
        <p className="text-[12px] text-muted">
          {t.orEmail}{" "}
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
