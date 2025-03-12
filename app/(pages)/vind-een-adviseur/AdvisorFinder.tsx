"use client";

import { useTracking } from "@/app/components/providers/tracking-provider";
import { Button } from "@/components/ui/button";
import { jdbApi } from "@/lib/api/JDBApi";
import { AdvisorFinderDict } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AdvisorFinderProps {
  dict: AdvisorFinderDict;
  locale: string;
}

export default function AdvisorFinder({ dict, locale }: AdvisorFinderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { trackingData } = useTracking();
  const isEnglish = locale === "en";

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFormSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      category: selectedCategory,
      lead_source: trackingData?.leadSource || "advisor_finder",
      tracking_id: trackingData?.trackingId,
      utm_params: trackingData?.utmParams,
      app_locale: locale,
    };

    try {
      const response = await jdbApi.submitForm("advisor-request", data);
      if (response.success) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "formSubmitted",
          ecommerce: {
            // form_id: response.id,
            form_handle: "advisor_finder",
            //form_data: visibleValues,
            language: isEnglish ? "en" : "nl",
            tracking_id: trackingData?.trackingId,
            lead_source: trackingData?.leadSource,
          },
        });

        setFormSubmitted(true);
      } else {
        // Handle error case
        console.error("Form submission failed:", response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setFormSubmitted(false);
  };

  return (
    <div className="relative">
      {/* Blue background with wave */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-primary -z-10">
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Advisor Finder Content */}
      <div className="relative z-0 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6">{dict.title}</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {dict.subtitle}
            </h2>
            <div className="space-y-4 mb-6">
              <p className="text-lg">{dict.intro.text}</p>
              <ul className="list-none space-y-2">
                {dict.intro.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-lg mb-6">{dict.intro.networkDescription}</p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/storage/media/business-professional.jpeg"
              alt="Belastingadviseur helpt klant"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {formSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">{dict.success.title}</h2>
            <p className="text-lg mb-6">{dict.success.message}</p>
            <Button
              onClick={resetForm}
              className="bg-primary text-white hover:bg-[#2341C7]"
            >
              {dict.success.newRequestButton}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-center">
                {dict.form.title}
              </h2>

              {selectedCategory === null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dict.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className="p-6 border border-gray-200 rounded-xl text-left hover:border-primary hover:shadow-md transition-all"
                    >
                      <h3 className="text-lg font-medium mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-primary hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {dict.form.backButton}
                    </button>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">
                      {
                        dict.categories.find((c) => c.id === selectedCategory)
                          ?.title
                      }
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {dict.form.fields.firstName}
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {dict.form.fields.lastName}
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {dict.form.fields.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {dict.form.fields.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {dict.form.fields.message.label}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={dict.form.fields.message.placeholder}
                        ></textarea>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="privacy"
                          name="privacy"
                          required
                          className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label
                          htmlFor="privacy"
                          className="ml-2 block text-sm text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: dict.form.privacyConsent,
                          }}
                        />
                      </div>

                      <div>
                        <Button
                          type="submit"
                          className="w-full bg-primary text-white hover:bg-[#2341C7] py-3"
                        >
                          {dict.form.submitButton}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {selectedCategory === null && (
              <div className="bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-3">
                      {dict.promise.title}
                    </h3>
                    <ul className="space-y-2">
                      {dict.promise.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {dict.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {dict.faq.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {dict.faq.items.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
