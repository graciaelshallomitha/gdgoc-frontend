"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ArrowRightIcon, ArrowUpRightIcon, SelectChevronIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { FormField, inputStyles } from "@/components/ui/FormField";
import { submitInquiry } from "@/services/contact";
import {
  EMPTY_VALUES,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactFormValues,
} from "@/lib/validators/contact";
import type { InquiryCategory } from "@/types/gdgoc";

type TextField = Exclude<keyof ContactFormValues, "consent">;
type Status = "idle" | "submitting" | "sent" | "unconfigured" | "failed";

const DRAFT_KEY = "gdgoc:contact-draft";

interface ContactFormProps {
  categories: InquiryCategory[];
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
}

export function ContactForm({ categories, selectedCategoryId, onCategoryChange }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failureMessage, setFailureMessage] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);

    // Restore an unfinished draft (state persistence). Consent is never restored.
    useEffect(() => {
    try {
        const raw = window.localStorage.getItem(DRAFT_KEY);

        if (raw) {
        const draft = JSON.parse(raw) as Partial<ContactFormValues>;

        // Intentional state update: hydrate form values from browser storage.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValues({ ...EMPTY_VALUES, ...draft, consent: false });
        }
    } catch {
        /* storage unavailable or corrupted: start with an empty form */
    }

    // Mark restoration complete before enabling draft persistence.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftLoaded(true);
    }, []);

  // Save after every change, but only once the draft has been read back.
  useEffect(() => {
    if (!draftLoaded) return;
    try {
      const { firstName, lastName, email, organization, subject, message } = values;
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ firstName, lastName, email, organization, subject, message }),
      );
    } catch {
      /* ignore */
    }
  }, [values, draftLoaded]);

  function updateText(field: TextField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Once a field has shown an error, re-validate as the user fixes it.
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, { ...values, [field]: value }) }));
    }
    if (status !== "idle") setStatus("idle");
  }

  function handleBlur(field: keyof ContactFormValues) {
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContact(values, selectedCategoryId);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitInquiry({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      organization: values.organization.trim(),
      category: selectedCategoryId,
      subject: values.subject.trim(),
      message: values.message.trim(),
    });

    if (result.status === "sent") {
      setValues(EMPTY_VALUES);
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
    }
    if (result.status === "failed") setFailureMessage(result.message);
    setStatus(result.status);
  }

  const describedBy = (field: keyof ContactErrors) => (errors[field] ? `field-${field}-error` : undefined);
  const submitting = status === "submitting";
  const consentColor = values.consent ? "text-primary" : errors.consent ? "text-red-600" : "text-muted";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
      className="flex flex-col gap-6 rounded-3xl bg-surface p-6 sm:p-9"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id="form-title" className="text-[30px] font-bold leading-[1.12] tracking-[-0.004em]">
          Send us a message
        </h2>
        <ArrowUpRightIcon className="mr-[5px] mt-[9px] shrink-0 text-link" />
      </div>
      <p className="text-[13px] leading-4 text-muted">Fields marked * are required.</p>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
        <FormField id="field-firstName" label="First name" required error={errors.firstName}>
          <input
            id="field-firstName"
            name="firstName"
            autoComplete="given-name"
            placeholder="Your first name"
            value={values.firstName}
            onChange={(e) => updateText("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={describedBy("firstName")}
            className={inputStyles(Boolean(errors.firstName))}
          />
        </FormField>
        <FormField id="field-lastName" label="Last name">
          <input
            id="field-lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder="Your last name"
            value={values.lastName}
            onChange={(e) => updateText("lastName", e.target.value)}
            className={inputStyles(false)}
          />
        </FormField>
      </div>

      <FormField id="field-email" label="Email address" required error={errors.email}>
        <input
          id="field-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Where we can reply to you"
          value={values.email}
          onChange={(e) => updateText("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
          className={inputStyles(Boolean(errors.email))}
        />
      </FormField>

      <FormField id="field-organization" label="University / organization">
        <input
          id="field-organization"
          name="organization"
          autoComplete="organization"
          placeholder="Where you study or work (optional)"
          value={values.organization}
          onChange={(e) => updateText("organization", e.target.value)}
          className={inputStyles(false)}
        />
      </FormField>

      <FormField id="field-category" label="Inquiry category" required error={errors.category}>
        <div className="relative">
          <select
            id="field-category"
            name="category"
            value={selectedCategoryId}
            onChange={(e) => {
              onCategoryChange(e.target.value);
              setErrors((current) => ({ ...current, category: undefined }));
            }}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={describedBy("category")}
            className={`${inputStyles(Boolean(errors.category))} appearance-none pr-12`}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <SelectChevronIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-link" />
        </div>
      </FormField>

      <FormField id="field-subject" label="Subject" required error={errors.subject}>
        <input
          id="field-subject"
          name="subject"
          placeholder="A short introduction to your question"
          value={values.subject}
          onChange={(e) => updateText("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className={inputStyles(Boolean(errors.subject))}
        />
      </FormField>

      <FormField id="field-message" label="Your message" required error={errors.message}>
        <textarea
          id="field-message"
          name="message"
          placeholder="Tell us a little about your question or idea…"
          value={values.message}
          onChange={(e) => updateText("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={`${inputStyles(Boolean(errors.message), "h-[146px] resize-y py-4")}`}
        />
      </FormField>

      <div>
        <div className="flex items-start gap-3">
          {/* Figma checkbox is 24px; the native input stays on top (invisible) for keyboard + screen readers. */}
          <span className="relative size-6 shrink-0">
            <input
              id="field-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => {
                setValues((current) => ({ ...current, consent: e.target.checked }));
                if (e.target.checked) setErrors((current) => ({ ...current, consent: undefined }));
              }}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy("consent")}
              className="peer absolute inset-0 z-10 size-6 cursor-pointer opacity-0"
            />
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              className={`size-6 rounded peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-link ${consentColor}`}
            >
              <path
                d="M16.25 3.75H7.75C5.54086 3.75 3.75 5.54086 3.75 7.75V16.25C3.75 18.4591 5.54086 20.25 7.75 20.25H16.25C18.4591 20.25 20.25 18.4591 20.25 16.25V7.75C20.25 5.54086 18.4591 3.75 16.25 3.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={values.consent ? "currentColor" : "none"}
              />
              {values.consent ? (
                <path d="M8.5 12.2L11 14.7L15.8 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
            </svg>
          </span>
          <label htmlFor="field-consent" className="cursor-pointer text-[13px] leading-[20px] text-muted">
            I agree that the information I share can be used to respond to this inquiry.
          </label>
        </div>
        {errors.consent ? (
          <p id="field-consent-error" className="mt-1.5 text-sm text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={submitting} className="w-full sm:w-[194px]">
          {submitting ? (
            <>
              Sending…
              <Loader2 aria-hidden className="size-5 animate-spin" />
            </>
          ) : (
            <>
              Send message
              <ArrowRightIcon className="shrink-0" />
            </>
          )}
        </Button>
        <p className="max-w-[230px] text-xs leading-[1.5] text-muted">
          Please don’t include passwords or sensitive personal information.
        </p>
      </div>

      {/* One live region announces every outcome to screen readers. */}
      <div role="status" aria-live="polite" className="empty:hidden">
        {status === "sent" ? (
          <p className="rounded-xl bg-mint p-4 text-sm text-green-900">
            Message sent. Thanks for reaching out. We’ll reply by email.
          </p>
        ) : null}
        {status === "unconfigured" ? (
          <p className="rounded-xl bg-warm p-4 text-sm text-amber-950">
            Your message looks good, but sending isn’t connected yet, so nothing was sent. Your answers are saved on this
            device.
          </p>
        ) : null}
        {status === "failed" ? <p className="rounded-xl bg-red-50 p-4 text-sm text-red-900">{failureMessage}</p> : null}
      </div>
    </form>
  );
} 