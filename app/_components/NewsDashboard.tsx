'use client';
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../_lib/fetchNews';
import NewsCard from './NewsCard';
import Filter from './Filter';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string; // Optional image field
}

const NewsDashboard: React.FC = () => {
  const [category, setCategory] = useState<string>('general');
  const [news, setNews] = useState<Article[]>([]); // Properly typed
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const articles = await fetchNews(category);

        if (Array.isArray(articles)) {
          const validArticles = articles.filter((article: Article) => {
            return article.title && article.description && article.urlToImage;
          });

          setNews(validArticles);
        } else {
          console.error("Fetched data is not an array:", articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category]);

  return (
    <main className="container w-full h-screen ">
      <Filter onFilter={setCategory} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.map((article, idx) => (
            <NewsCard
              key={idx}
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage} // Pass the image URL to the NewsCard
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default NewsDashboard;
