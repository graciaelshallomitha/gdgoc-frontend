import type {
  ApiListResponse,
  ApiResponse,
  Track,
  CommunityValue,
  LearningFormat,
  JourneyStep,
  FAQ,
  InquiryCategory,
  NavigationItem,
  CommunityStats,
} from "@/types/gdgoc";

const API_BASE_URL = process.env.API_BASE_URL;

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError("API_BASE_URL is not configured.");
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}${endpoint}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new ApiError(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

async function fetchList<T>(endpoint: string): Promise<T[]> {
  const result = await fetchApi<ApiListResponse<T>>(endpoint);

  if (!result.success || !Array.isArray(result.data)) {
    throw new ApiError(`Invalid API response from ${endpoint}`);
  }

  return result.data;
}

async function fetchObject<T>(endpoint: string): Promise<T> {
  const result = await fetchApi<ApiResponse<T>>(endpoint);

  if (!result.success || !result.data || typeof result.data !== "object") {
    throw new ApiError(`Invalid API response from ${endpoint}`);
  }

  return result.data;
}

// Landing page data
export const getTracks = () => fetchList<Track>("/tracks");

export const getValues = () =>
  fetchList<CommunityValue>("/values");

export const getFormats = () =>
  fetchList<LearningFormat>("/formats");

export const getJourney = () =>
  fetchList<JourneyStep>("/journey");

export const getFaqs = (category?: string) => {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  return fetchList<FAQ>(`/faqs${query}`);
};

export const getStats = () =>
  fetchObject<CommunityStats>("/stats");

// Contact page data
export const getInquiryCategories = () =>
  fetchList<InquiryCategory>("/inquiry-categories");

// Shared data
export const getNavigation = () =>
  fetchList<NavigationItem>("/navigation");