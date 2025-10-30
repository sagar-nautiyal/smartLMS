// Smart API Configuration
// Automatically detects environment and uses appropriate API URL

const getApiUrl = () => {
  // Check current hostname (most reliable way)
  const hostname = window.location.hostname;
  
  // If explicitly set in env, use that first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Auto-detect based on hostname (hostname takes priority over dev mode)
  if (hostname === '13.61.151.128') {
    // AWS production with Nginx reverse proxy
    return 'http://13.61.151.128/api';
  } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Local development
    return 'http://localhost:3000';
  } else {
    // Default to current origin with /api path (works for any domain with reverse proxy)
    return `${window.location.protocol}//${hostname}/api`;
  }
};

// Export the API URL
export const API_URL = getApiUrl();

// Helper function to build full API endpoint URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  // Check if API_URL already ends with /api (Nginx reverse proxy setup)
  if (API_URL.endsWith('/api')) {
    // API_URL already includes /api, just append the endpoint
    return `${API_URL}/${cleanEndpoint}`;
  } else {
    // Traditional setup: add /api/ prefix
    return `${API_URL}/api/${cleanEndpoint}`;
  }
};

// Debug info (always show for troubleshooting)
console.log('🔧 API Config Debug:');
console.log('- Hostname:', window.location.hostname);
console.log('- API URL:', API_URL);
console.log('- VITE_API_URL:', import.meta.env.VITE_API_URL || 'Not set');
console.log('- DEV Mode:', import.meta.env.DEV);