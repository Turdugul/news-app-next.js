
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

export const fetchNews = async (category: string): Promise<NewsArticle[]> => {
  const apiKey = process.env.NEXT_PUBLIC_YOUR_API_KEY;
  const baseUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;

  if (!apiKey) {
    throw new Error('API key is missing.');
  }

  const fetchCategoryNews = async (cat: string): Promise<NewsArticle[]> => {
    const url = `${baseUrl}&category=${cat}`;
    let response = await fetch(url);
    let attempts = 0;
    const maxAttempts = 3;

    // Retry logic for rate-limited API requests (status 429)
    while (response.status === 429 && attempts < maxAttempts) {
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 10000)); // wait for 10 seconds
      response = await fetch(url);
    }

   
    if (!response.ok) {
      console.error(`Failed to fetch news for category ${cat}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data.articles || [];
  };

  if (category === 'all') {
    const categories: string[] = [
      'general',
      'business',
      'technology',
      'health',
      'science',
      'entertainment',
      'sports',
    ];

 
    const allCategoryPromises = categories.map(fetchCategoryNews);
    const allCategoryResults = await Promise.all(allCategoryPromises);


    return allCategoryResults.flat();
  }


  const url = `${baseUrl}&category=${category}`;
  let response = await fetch(url);
  let attempts = 0;

  while (response.status === 429 && attempts < 3) {
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 10000)); // wait for 10 seconds
    response = await fetch(url);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch news for category ${category}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.articles || [];
};
