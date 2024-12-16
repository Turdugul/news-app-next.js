'use client';
import React from 'react';

interface NewsCardProps {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, url, urlToImage }) => {
  // Truncate the title to 50 characters
  const truncatedTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;

  // Truncate the description to 80 characters
  const truncatedDescription =
    description && description.length > 80 ? description.substring(0, 80) + '...' : description;

  return (
    <div className="bg-white border rounded-lg shadow-md  dark:bg-slate-700 p-4 w-80 h-[400px]">
      {/* Render image only if urlToImage is available */}
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}

      <h2 className="text-xl font-bold overflow-hidden text-ellipsis" style={{ WebkitLineClamp: 2 }}>
        {truncatedTitle}
      </h2>

      {/* Render description if available */}
      {description && (
        <p className="text-gray-600 overflow-hidden text-ellipsis h-24 mt-2">
          {truncatedDescription}
          {/* Show "Read more" only if description is truncated */}
          {description.length > 80 && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline ml-1"
            >
              Read more
            </a>
          )}
        </p>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Read full article
      </a>
    </div>
  );
};

export default NewsCard;
