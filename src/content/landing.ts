import type { ComponentType, SVGProps } from "react";
import { HandsOnIcon, ShareIcon, StudyIcon } from "@/components/icons";

/**
 * Landing page copy, taken verbatim from the Figma design.
 * The Landing design differs from the API payloads (/tracks, /formats, /journey,
 * /faqs belong to the Overview design), so this page deliberately does not use them.
 */
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export interface TrackContent {
  id: string;
  theme: string;
  name: string;
  description: string;
  topics: string[];
  tint: string; // Tailwind bg class for the illustration area
  artwork: { src: string; size: number };
}

export const TRACKS: TrackContent[] = [
  {
    id: "research-discovery",
    theme: "Explore the why",
    name: "Research & discovery",
    description: "Ask better questions, understand people, and turn insight into a clear problem worth solving.",
    topics: ["Problem framing", "User research", "Product thinking"],
    tint: "bg-tint",
    artwork: { src: "/images/track-research.webp", size: 257 },
  },
  {
    id: "design-creativity",
    theme: "Make it meaningful",
    name: "Design & creativity",
    description: "Translate ideas into thoughtful experiences, from a first sketch to a prototype people can use.",
    topics: ["UI/UX", "Visual storytelling", "Prototyping"],
    tint: "bg-warm",
    artwork: { src: "/images/track-design.webp", size: 252 },
  },
  {
    id: "development",
    theme: "Bring ideas to life",
    name: "Development",
    description: "Learn the tools, write the code, and build useful things with people who enjoy figuring it out.",
    topics: ["Web & mobile", "Cloud", "AI foundations"],
    tint: "bg-mint",
    artwork: { src: "/images/track-development.webp", size: 257 },
  },
];

export interface FormatContent {
  id: string;
  Icon: Icon;
  name: string;
  description: string;
  detail: string;
}

export const FORMATS: FormatContent[] = [
  {
    id: "study-together",
    Icon: StudyIcon,
    name: "Study together",
    description: "Work through foundations in peer learning sessions. Bring your questions; leave with a next step.",
    detail: "Study groups & guided practice",
  },
  {
    id: "try-it-hands-on",
    Icon: HandsOnIcon,
    name: "Try it hands-on",
    description: "Explore a tool or technique in a workshop, then put it to work in a small experiment.",
    detail: "Workshops & technical sessions",
  },
  {
    id: "share-the-process",
    Icon: ShareIcon,
    name: "Share the process",
    description: "Exchange feedback, explain your decisions, and learn from different ways of thinking.",
    detail: "Project circles & sharing sessions",
  },
];

export const JOURNEY = [
  { id: "curiosity", number: "01", title: "Follow your curiosity", description: "Explore the tracks and find a topic you want to understand better." },
  { id: "together", number: "02", title: "Learn alongside others", description: "Join a learning opportunity, ask a question, and share your perspective." },
  { id: "action", number: "03", title: "Turn learning into action", description: "Practice through a project, exchange feedback, and pass something on." },
];

export const FAQS = [
  {
    id: "how-to-code",
    question: "Do I need to know how to code?",
    answer: "No. Start with an interest in technology and a willingness to learn. Research and design are part of the journey, too.",
  },
  {
    id: "cs-students",
    question: "Is this only for computer science students?",
    answer: "Different disciplines bring different perspectives. Explore the overview to find a starting point that fits your interests.",
  },
  {
    id: "opportunities",
    question: "How can I find learning opportunities?",
    answer: "Keep an eye on @gdgoc.ugm for community updates. You can also use the contact page to ask about getting involved.",
  },
];