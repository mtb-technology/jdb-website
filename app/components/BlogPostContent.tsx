import { BackButton } from "@/app/components/back-button";
import { BlogPostResponse } from "@/lib/api/JDBApi";
import { Calendar, Share2, User } from "lucide-react";
import Image from "next/image";
import React from "react";

// Define the props for the BlogPostContent component
interface BlogPostContentProps {
  currentPost: BlogPostResponse;
  locale: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  currentPost,
  locale,
}) => {
  // Parse HTML content
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="relative z-0 pt-12 pb-24">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 mb-6">
        <BackButton />
      </div>

      {/* Post Header */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="inline-block mb-4">
          <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
            {currentPost.category.name}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {currentPost.title}
        </h1>
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-6">
          {currentPost.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {currentPost.author.name}
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(currentPost.published_at).toLocaleDateString(
              locale === "nl" ? "nl-NL" : "en-US",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="relative h-64 md:h-96 overflow-hidden rounded-xl">
          {currentPost.banner && currentPost.banner.large && (
            <Image
              src={currentPost.banner.large}
              alt={currentPost.title}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        {currentPost.content ? (
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={createMarkup(currentPost.content)} />
          </div>
        ) : (
          <p className="text-gray-600">Inhoud is momenteel niet beschikbaar.</p>
        )}

        {/* Share Buttons */}
        <div className="mt-8 flex items-center gap-2">
          <span className="text-sm text-gray-600">Deel dit artikel:</span>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
