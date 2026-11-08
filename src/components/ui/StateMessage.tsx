import { AlertTriangle, Inbox } from "lucide-react"; 

interface StateMessageProps {
  title: string;
  description: string;
}

/** Shown when a section's data failed to load. */
export function ErrorState({ title, description }: StateMessageProps) {
  return (
    <div role="alert" className="flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
      <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-relaxed">{description}</p>
        {/* A plain anchor forces a full reload, which re-runs the server fetch. */}
        <a href="" className="mt-3 inline-block text-sm font-medium underline underline-offset-4">
          Reload the page
        </a>
      </div>
    </div>
  );
}

/** Shown when the request worked but returned nothing. */
export function EmptyState({ title, description }: StateMessageProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-dashed border-line bg-surface p-6">
      <Inbox aria-hidden className="mt-0.5 size-5 shrink-0 text-muted" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}