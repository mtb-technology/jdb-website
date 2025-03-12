"use client";

import type { Dictionary } from "@/app/dictionaries/types";
import { Button } from "@/components/ui/button";
import { jdbApi } from "@/lib/api/JDBApi";
import { useState } from "react";

interface NewsletterSubscriptionProps {
  dict: Dictionary;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  dict,
}) => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const handleNewsletterSubscription = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const response = await jdbApi.subscribeToNewsletter(email as string);
      if (response.id) {
        setSubscriptionSuccess(true);
      } else {
        console.error("Subscription failed:");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 mt-24">
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">
            {dict.pages.blog.newsletter.title}
          </h2>
          <p className="text-gray-600">
            {dict.pages.blog.newsletter.description}
          </p>
        </div>
        {subscriptionSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-600">
              Thank you for subscribing! You will receive updates to your email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleNewsletterSubscription}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder={dict.pages.blog.newsletter.emailPlaceholder}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button className="bg-primary text-white hover:bg-[#2341C7] whitespace-nowrap">
              {dict.pages.blog.newsletter.subscribeButton}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSubscription;
