import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="text-3xl font-medium">We couldn&rsquo;t find that page.</h1>
      <p className="mt-4 text-muted">It may have moved, or the link may be incorrect.</p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </div>
  );
} 