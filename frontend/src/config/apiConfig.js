// Smart API Configuration
// Automatically detects environment and uses appropriate API URL

const getApiUrl = () => {
  // Check current hostname (most reliable way)
  const hostname = window.location.hostname;

  // If explicitly set in env, use that first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }

  // 2. Local dev
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }

  // Auto-detect based on hostname (hostname takes priority over dev mode)
  if (hostname === "13.61.151.128") {
    // AWS production with Nginx reverse proxy
    return "http://13.61.151.128/api";
  } else if (hostname === "localhost" || hostname === "127.0.0.1") {
    // Local development
    return "http://localhost:3000";
  } else {
    // Default to current origin with /api path (works for any domain with reverse proxy)
    return `${window.location.protocol}//${hostname}/api`;
  }
};

// Export the API URL
export const API_URL = getApiUrl().replace(/\/$/, "");

// Helper function to build full API endpoint URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

  const endsWithApi = API_URL.endsWith("/api");

  // Check if API_URL already ends with /api (Nginx reverse proxy setup)
  if (endsWithApi) {
    // API_URL already includes /api, just append the endpoint
    const result = `${API_URL}/${cleanEndpoint}`;
  // ...
    return result;
  } else {
    // Traditional setup: add /api/ prefix
    const result = `${API_URL}/api/${cleanEndpoint}`;
  // ...
    return result;
  }
};

