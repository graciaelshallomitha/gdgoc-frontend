"use client";

import { Button } from "@/components/ui/Button";

/** Route-level safety net. Section-level failures are handled inside each section. */
export default function RouteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="text-3xl font-medium">Something went wrong on our side.</h1>
      <p className="mt-4 text-muted">The page couldn&rsquo;t be displayed. Try again in a moment.</p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </div>
  );
} 