import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FORMATS } from "@/content/landing";

export function FormatsSection() {
  return (
    <section id="formats" aria-labelledby="formats-title" className="bg-surface">
      <Container className="flex flex-col gap-10 py-20">
        <SectionHeading
          id="formats-title"
          label="More than a classroom"
          title="Less watching. More making."
          description="Learn in a way that turns a new concept into something you can actually use."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map(({ id, Icon, name, description, detail }) => (
            <li key={id} className="flex flex-col gap-5 rounded-3xl bg-white p-8">
              <Icon className="text-link" />
              <h3 className="text-[28px] font-bold leading-[1.12] tracking-[-0.004em]">{name}</h3>
              <p className="leading-[25px] text-muted">{description}</p>
              <div aria-hidden className="h-px bg-line" />
              <p className="text-[13px] font-medium leading-4 text-link">{detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}