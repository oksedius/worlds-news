const PROXY = "https://api.allorigins.win/raw?url=";

const TOP_RSS = "https://feeds.bbci.co.uk/news/rss.xml";

const SEARCH_RSS = "https://feeds.bbci.co.uk/news/search/rss?q=";

const parseRss = async (url) => {
  try {
    const response = await fetch(PROXY + encodeURIComponent(url));
    if (!response.ok) return [];

    const text = await response.text();
    const xml = new DOMParser().parseFromString(text, "text/xml");
    const items = xml.querySelectorAll("item");

    return Array.from(items)
      .slice(0, 20)
      .map((item) => ({
        title: item.querySelector("title")?.textContent || "Без заголовка",
        description:
          item.querySelector("description")?.textContent ||
          item.querySelector("description")?.textContent ||
          "",
        url: item.querySelector("link")?.textContent || "#",
        publishedAt:
          item.querySelector("pubDate")?.textContent ||
          new Date().toISOString(),
        source: { name: "BBC News" },
        image:
          item.querySelector("enclosure")?.getAttribute("url") ||
          item.querySelector("thumbnail")?.getAttribute("url") ||
          null,
      }));
  } catch (err) {
    console.warn("RSS не завантажився, повертаю порожній масив");
    return [];
  }
};

export const getTopHeadlines = async (country = "us", category = "general") => {
  return await parseRss(TOP_RSS);
};

export const searchNews = async (query) => {
  if (!query?.trim()) return await getTopHeadlines();
  return await parseRss(SEARCH_RSS + encodeURIComponent(query));
};
