import { fetchNews } from '@/app/_lib/fetchNews';
import NewsCard from '@/app/_components/NewsCard';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const news: NewsArticle[] = await fetchNews(params.category);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{params.category} News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((article: NewsArticle, idx: number) => (
          <NewsCard
            key={idx}
            title={article.title}
            description={article.description}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
}
