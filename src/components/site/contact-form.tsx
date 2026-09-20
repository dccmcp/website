"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle, PaperPlaneTilt, CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TurnstileWidget = {
  render: (target: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileWidget;
  }
}

const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";

let turnstilePromise: Promise<TurnstileWidget> | null = null;

/**
 * Cloudflare's explicit-render script, loaded once per document no matter how
 * many forms are on the page (the enterprise page has two). Every widget is
 * then rendered and reset by hand so tokens are never reused.
 */
function loadTurnstile(): Promise<TurnstileWidget> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile needs a browser"));
  }

  if (turnstilePromise) return turnstilePromise;

  turnstilePromise = new Promise<TurnstileWidget>((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    if (!document.getElementById(TURNSTILE_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (window.turnstile) {
        window.clearInterval(timer);
        resolve(window.turnstile);
      } else if (Date.now() - startedAt > 8000) {
        window.clearInterval(timer);
        turnstilePromise = null;
        reject(new Error("Turnstile did not load"));
      }
    }, 150);
  });

  return turnstilePromise;
}

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
    captchaRequired: "Verification is still running — give it a second and send again.",
    captchaFailed:
      "We could not verify that you are human. Reload the page and try again, or email support@dccmcp.com.",
    captchaUnavailable:
      "The verification widget could not load. Email support@dccmcp.com and we will pick it up from there.",
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
    captchaRequired: "人机验证还在进行中——稍等一秒再发送一次。",
    captchaFailed: "人机验证没通过。请刷新页面重试，或直接写信到 support@dccmcp.com。",
    captchaUnavailable: "验证组件没能加载。请写信到 support@dccmcp.com，我们会接着处理。",
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
  const [captchaBroken, setCaptchaBroken] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetRef.current) return;
        widgetIdRef.current = turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          theme: "dark",
          // Managed mode clears real visitors in the background; this keeps the
          // widget out of the layout entirely until a challenge is required.
          appearance: "interaction-only",
          size: "flexible",
          callback: () => setCaptchaBroken(false),
          "error-callback": () => setCaptchaBroken(true),
          "expired-callback": () => setCaptchaBroken(true),
        });
      })
      .catch(() => {
        if (!cancelled) setCaptchaBroken(true);
      });

    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [siteKey]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    // Tokens are single-use, so read a fresh one on every attempt.
    const turnstileToken = siteKey
      ? window.turnstile?.getResponse(widgetIdRef.current ?? undefined)
      : undefined;

    if (siteKey && !turnstileToken) {
      setStatus("error");
      // A widget that failed to load must not read as "still verifying" — that
      // sends people back to a button that cannot work. Point them at email.
      setMessage(captchaBroken ? t.captchaUnavailable : t.captchaRequired);
      return;
    }

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
          turnstileToken,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        fields?: Record<string, string>;
      };

      // Whatever happened, the token has been spent.
      if (siteKey) window.turnstile?.reset(widgetIdRef.current ?? undefined);

      if (!response.ok) {
        setStatus("error");
        if (payload.error === "captcha-failed") {
          setMessage(captchaBroken ? t.captchaUnavailable : t.captchaFailed);
          return;
        }
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
          {/*
            The tick glyph is drawn by `.checkbox-mint:checked` in the components
            layer. `checked:bg-mint` has to be set here as a utility as well:
            on its own, `bg-ink` wins the cascade, leaving a near-black tick
            invisible on a near-black box.
          */}
          {t.softwareOptions.map((option) => (
            <label
              key={option.value}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-muted transition-colors has-checked:border-mint/50 has-checked:bg-mint/10 has-checked:text-mint-bright hover:border-line"
            >
              <input
                type="checkbox"
                name="software"
                value={option.value}
                className="checkbox-mint h-4 w-4 shrink-0 appearance-none rounded-[4px] border border-line bg-ink transition-colors checked:border-mint checked:bg-mint"
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

      {siteKey ? (
        <div className="flex flex-col gap-2">
          {/* data attribute so the widget can be asserted in a built page */}
          <div ref={widgetRef} data-turnstile-widget="" />
          {captchaBroken ? (
            <span className="text-[12px] text-amber-200">{t.captchaUnavailable}</span>
          ) : null}
        </div>
      ) : null}

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
