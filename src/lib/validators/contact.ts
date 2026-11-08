export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  consent: boolean;
}

export type ContactField = keyof ContactFormValues | "category";
export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMPTY_VALUES: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(
  field: keyof ContactFormValues,
  values: ContactFormValues,
): string | undefined {
  switch (field) {
    case "firstName":
      return values.firstName.trim() ? undefined : "Enter your first name.";
    case "email": {
      const email = values.email.trim();
      if (!email) return "Enter your email address.";
      return EMAIL_PATTERN.test(email) ? undefined : "Enter a valid email address, like name@example.com.";
    }
    case "subject": {
      const subject = values.subject.trim();
      if (!subject) return "Add a short subject.";
      return subject.length <= 120 ? undefined : "Keep the subject under 120 characters.";
    }
    case "message": {
      const message = values.message.trim();
      if (!message) return "Tell us a little about your question or idea.";
      if (message.length < 10) return "Add a few more words so we can understand your message.";
      return message.length <= 2000 ? undefined : "Keep the message under 2,000 characters.";
    }
    case "consent":
      return values.consent ? undefined : "Agree to the statement above so we can respond.";
    default:
      return undefined; // lastName and organization are optional
  }
}

const VALIDATED_FIELDS: (keyof ContactFormValues)[] = [
  "firstName",
  "email",
  "subject",
  "message",
  "consent",
];

export function validateContact(
  values: ContactFormValues,
  categoryId: string,
): ContactErrors {
  const errors: ContactErrors = {};

  for (const field of VALIDATED_FIELDS) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  if (!categoryId) errors.category = "Choose the topic closest to your question.";

  return errors;
}