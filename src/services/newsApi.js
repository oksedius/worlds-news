import axios from "axios";

let viteKey;
try {
  viteKey = import.meta?.env?.VITE_MEDIASTACK_API_KEY;
} catch (e) {
  viteKey = undefined;
}

const API_KEY =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_MEDIASTACK_API_KEY) ||
  viteKey ||
  (typeof window !== "undefined" && window.__MEDIASTACK_API_KEY) ||
  "YOUR_API_KEY";

const KEY_SOURCE = (() => {
  if (
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_MEDIASTACK_API_KEY
  )
    return "process.env";
  if (viteKey) return "import.meta.env";
  if (typeof window !== "undefined" && window.__MEDIASTACK_API_KEY)
    return "window.__MEDIASTACK_API_KEY";
  return null;
})();

if (KEY_SOURCE) {
  const masked =
    API_KEY === "YOUR_API_KEY"
      ? "placeholder"
      : `${API_KEY.slice(0, 4)}...${API_KEY.slice(-4)}`;
  console.debug(`MediaStack key detected from ${KEY_SOURCE}:`, masked);
} else {
  console.error(
    "MediaStack API key is missing or not set. Set REACT_APP_MEDIASTACK_API_KEY (CRA), VITE_MEDIASTACK_API_KEY (Vite) or window.__MEDIASTACK_API_KEY."
  );
}

const BASE_URL = "https://api.mediastack.com/v1";

const hasValidKey = () => !!API_KEY && API_KEY !== "YOUR_API_KEY";

const handleAxiosError = (error, context) => {
  const status = error?.response?.status;
  if (status === 401) {
    console.error(
      `${context}: 401 Unauthorized — check your MediaStack API key.`
    );
  } else {
    console.error(`${context}:`, error);
  }
};

export const getTopHeadlines = async (category = "general", country = "us") => {
  if (!hasValidKey()) {
    console.error(
      "MediaStack API key is missing or not set. Set REACT_APP_MEDIASTACK_API_KEY (CRA), VITE_MEDIASTACK_API_KEY (Vite) or window.__MEDIASTACK_API_KEY."
    );
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: {
        access_key: API_KEY,
        countries: country,
        categories: category,
        limit: 20,
      },
    });
    return response.data.data || [];
  } catch (error) {
    handleAxiosError(error, "Error fetching headlines");
    return [];
  }
};

export const searchNews = async (query) => {
  if (!hasValidKey()) {
    console.error("MediaStack API key is missing or not set.");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: {
        access_key: API_KEY,
        keywords: query,
        limit: 20,
        sort: "published_desc",
      },
    });
    return response.data.data || [];
  } catch (error) {
    handleAxiosError(error, "Error searching news");
    return [];
  }
};
