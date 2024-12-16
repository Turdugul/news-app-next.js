


export const fetchNews = async (category: string) => {
    const apiKey = process.env.NEXT_PUBLIC_YOUR_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
  
    let response = await fetch(url);
    let attempts = 0;
    const maxAttempts = 3;
    
    // Retry logic in case of rate limit (429)
    while (response.status === 429 && attempts < maxAttempts) {
      attempts++;
      console.log(`Rate limit exceeded. Retrying attempt ${attempts}...`);
      await new Promise(resolve => setTimeout(resolve, 10000));  // Wait for 10 seconds before retrying
      response = await fetch(url);
    }
  
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.articles || [];
  };
  
