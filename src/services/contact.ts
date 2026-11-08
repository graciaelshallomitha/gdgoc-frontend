export interface InquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  category: string;
  subject: string;
  message: string;
}

export type SubmitResult =
  | { status: "sent" }
  | { status: "unconfigured" }
  | { status: "failed"; message: string };

/**
 * The documented API only exposes GET endpoints, so there is no confirmed place
 * to send an inquiry. Rather than pretend a message was delivered, this adapter
 * reports "unconfigured" until NEXT_PUBLIC_CONTACT_ENDPOINT is provided.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) return { status: "unconfigured" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { status: "failed", message: `The server responded with status ${response.status}.` };
    }
    return { status: "sent" };
  } catch {
    return { status: "failed", message: "We couldn't reach the server. Check your connection and try again." };
  }
}