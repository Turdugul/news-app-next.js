export const fetchNews = async (category: string) => {
  const apiKey = process.env.NEXT_PUBLIC_YOUR_API_KEY;
  const baseUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;

  if (category === 'all') {
    const categories = ['general', 'business', 'technology', 'health', 'science'];
    const maxAttempts = 3;

    const fetchCategoryNews = async (cat: string) => {
      const url = `${baseUrl}&category=${cat}`;
      let response = await fetch(url);
      let attempts = 0;

      while (response.status === 429 && attempts < maxAttempts) {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 10000));
        response = await fetch(url);
      }

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data.articles || [];
    };

    const allCategoryPromises = categories.map(fetchCategoryNews);
    const allCategoryResults = await Promise.all(allCategoryPromises);

    return allCategoryResults.flat();
  }

  const url = `${baseUrl}&category=${category}`;
  let response = await fetch(url);
  let attempts = 0;

  while (response.status === 429 && attempts < 3) {
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 10000));
    response = await fetch(url);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  const data = await response.json();
  return data.articles || [];
};
