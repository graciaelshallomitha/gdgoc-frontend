export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Track {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  skills: string[];
  what_you_do: string;
  explore_link: string;
  open: boolean;
}

export interface CommunityValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface LearningFormat {
  id: string;
  name: string;
  description: string;
  icon: string;
  cta: string;
}

export interface JourneyStep {
  step: number;
  id: string;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InquiryCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  guidance: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface CommunityStats {
  community_members: number;
  workshops_held: number;
  projects_shipped: number;
  active_tracks: number;
  university: string;
  city: string;
  country: string;
  founded_year: number;
  social: {
    instagram: string;
    linkedin: string;
    github: string;
  };
  tagline: string;
}