import { fetchNews } from '@/app/_lib/fetchNews';
import NewsCard from '@/app/_components/NewsCard';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Awaiting params to ensure it's handled properly
  const {category} = await params

  try {
    // Fetch news articles for the category
    const news: NewsArticle[] = await fetchNews(category);

    if (news.length === 0) {
      return (
        <div className="container mx-auto pb-20 p-4">
          <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>
          <p className="text-gray-500">No articles found for this category.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto pb-20 p-4">
        <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.slice(0, 9).map((article: NewsArticle, idx: number) => (
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
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return (
      <div className="container mx-auto pb-20 p-4">
        <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>
        <p className="text-red-500">Failed to load articles. Please try again later.</p>
      </div>
    );
  }
}
