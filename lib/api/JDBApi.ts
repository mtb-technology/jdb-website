interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: string;
  featured_image?: string;
  banner: {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    full?: string;
  };
  image: {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    full?: string;
  };
  category: Category;
  author: Author;
  tags?: Tag[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_visible: boolean;
  posts_count?: number;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}


interface PaginatedPostResponse<T> {
  posts: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

interface BlogPostsResponse extends PaginatedPostResponse<Post> {}

interface BlogPostResponse extends Post {}

interface BlogCategoriesResponse {
  categories: Category[];
}

interface BlogCategoryResponse {
  category: Category;
}

interface FormSubmissionRequest {
  [key: string]: any;
  tracking_id?: string;
  lead_source?: string;
  app_locale?: string;
}

interface FormSubmissionResponse {
  success: boolean;
  message?: string;
}

interface FormResponse {
  success: boolean;
  form: FormData;
}

export class JDBApi {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'https://api.jandebelastingman.nl') {
    this.baseUrl = baseUrl;
  }

  private async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getBlogPosts(params?: {
    category?: string;
    tag?: string;
    page?: number;
    locale?: string;
  }): Promise<BlogPostsResponse> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.tag) searchParams.append('tag', params.tag);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.locale) searchParams.append('locale', params.locale);

    const queryString = searchParams.toString();
    const endpoint = `/blog/posts${queryString ? `?${queryString}` : ''}`;

    return this.fetchApi<BlogPostsResponse>(endpoint);
  }

  async getBlogPost(slug: string, locale?: string): Promise<BlogPostResponse> {
    const searchParams = new URLSearchParams();
    if (locale) searchParams.append('locale', locale);

    const queryString = searchParams.toString();
    const endpoint = `/blog/posts/${slug}${queryString ? `?${queryString}` : ''}`;

    return this.fetchApi<{post: BlogPostResponse}>(endpoint).then(function(res){
      return res.post;
    });
  }

  async getBlogCategories(locale?: string): Promise<BlogCategoriesResponse> {
    const searchParams = new URLSearchParams();
    if (locale) searchParams.append('locale', locale);

    const queryString = searchParams.toString();
    const endpoint = `/blog/categories${queryString ? `?${queryString}` : ''}`;

    return this.fetchApi<BlogCategoriesResponse>(endpoint);
  }

  async getBlogCategory(slug: string, locale?: string): Promise<BlogCategoryResponse> {
    const searchParams = new URLSearchParams();
    if (locale) searchParams.append('locale', locale);

    const queryString = searchParams.toString();
    const endpoint = `/blog/categories/${slug}${queryString ? `?${queryString}` : ''}`;

    return this.fetchApi<BlogCategoryResponse>(endpoint);
  }

  async submitForm(handle: string, data: FormSubmissionRequest): Promise<FormSubmissionResponse> {
    return this.fetchApi<FormSubmissionResponse>(`/forms/${handle}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getForm(handle: string): Promise<FormResponse> {
    return this.fetchApi<FormResponse>(`/forms/${handle}`);
  }

  async subscribeToNewsletter(email: string): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/email-subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Subscription failed');
    }

    return await response.json();
  }
}

// Create a singleton instance
export const jdbApi = new JDBApi();

// Export types for use in components
export type {
  Author, BlogCategoriesResponse,
  BlogCategoryResponse, BlogPostsResponse, Category, FormResponse, FormSubmissionRequest,
  FormSubmissionResponse, PaginatedResponse, Post, Tag
};

