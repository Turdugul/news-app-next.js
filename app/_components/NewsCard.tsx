'use client';
import React from 'react';


const getRelativeTime = (publishedAt: string): string => {
  const now = new Date();
  const publishedDate = new Date(publishedAt);
  const diffInMs = now.getTime() - publishedDate.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

interface NewsCardProps {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string; // Add publishedAt prop
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, url, urlToImage, publishedAt }) => {
  const truncatedTitle = title.length > 80 ? title.substring(0, 80) + '...' : title;
  const relativeTime = getRelativeTime(publishedAt);

  return (
    <div className="bg-white border rounded-lg shadow-md dark:bg-stone-100 border-l-8 border-l-blue-700 dark:border-l-stone-950 p-4 w-96 h-[400px]">
      {/* Render image only if urlToImage is available */}
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg mb-2"
        />
      )}

      <h2 className="text-lg font-semibold overflow-hidden text-ellipsis h-24" style={{ WebkitLineClamp: 2 }}>
        {truncatedTitle}
      </h2>
      <p className="text-gray-500 text-sm mb-2">{relativeTime}</p>
      {description && (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 overflow-hidden text-ellipsis h-14 mt-2 block hover:underline"
  >
    {description.length > 80
      ? `${description.substring(0, 80)}...`
      : description}
  </a>
)}
    </div>
  );
};

export default NewsCard;
