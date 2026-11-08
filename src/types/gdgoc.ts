/** Shape shared by every endpoint: { success, count?, data } */
export interface ApiEnvelope<T> {
  success: boolean;
  count?: number;
  data: T;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface InquiryCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  guidance: string;
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