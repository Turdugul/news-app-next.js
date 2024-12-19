'use client';
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../_lib/fetchNews';
import NewsCard from './NewsCard';
import Filter from './Filter';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

const NewsDashboard: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const articles = await fetchNews(category);

        if (Array.isArray(articles)) {
          const validArticles = articles.filter((article: Article) => {
            return article.title && article.description && article.urlToImage && article.publishedAt;
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
    <main className="container w-full h-auto pb-20">
      <Filter onFilter={setCategory} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-6 mb-4">
          {news.slice(0, 9).map((article, idx) => (
            <NewsCard
              key={idx}
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
              publishedAt={article.publishedAt}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default NewsDashboard;
