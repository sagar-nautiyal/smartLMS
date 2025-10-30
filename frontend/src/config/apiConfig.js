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
    // AWS production
    return 'http://13.61.151.128:3000';
  } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Local development
    return 'http://localhost:3000';
  } else {
    // Default to current origin with port 3000 (works for any domain)
    return `${window.location.protocol}//${hostname}:3000`;
  }
};

// Export the API URL
export const API_URL = getApiUrl();

// Helper function to build full API endpoint URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_URL}/api/${cleanEndpoint}`;
};

// Debug info (always show for troubleshooting)
console.log('🔧 API Config Debug:');
console.log('- Hostname:', window.location.hostname);
console.log('- API URL:', API_URL);
console.log('- VITE_API_URL:', import.meta.env.VITE_API_URL || 'Not set');
console.log('- DEV Mode:', import.meta.env.DEV);