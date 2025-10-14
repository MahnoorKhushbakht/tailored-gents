export async function getCategoriesId(slug) {
  const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_WP}categories?slug=${slug}`, {
      next: { cache: 'no-store' }
  });
  const categories = await categoryResponse.json();
  const { id } = categories[0]; 
  return id;
}

export async function getCategories(slug) {
  const categoryId = await getCategoriesId(slug);
  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_WP}posts?categories=${categoryId}`, {
      next: { cache: 'no-store' }
  });
  const posts = await postsResponse.json();
  return posts;
}

export async function getCategoriesSlug() {
  const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_WP}categories`, {
      next: { cache: 'no-store' }
  });
  const categories = await categoryResponse.json();
  return categories.map(category => category.slug);
}

export async function getPosts(slug) {
  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_WP}posts?slug=${slug}`, {
      next: { cache: 'no-store' }
  });
  const posts = await postsResponse.json();
  return posts;
}

export async function getSlugs() {
  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_WP}posts`, {
      next: { cache: 'no-store' }
  });
  const posts = await postsResponse.json();
  return posts.map((post) => post.slug);
}

export async function getComments(slug) {
  console.log('slug',slug)
  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_Site}api/posts`, {
      next: { cache: 'no-store' }
  });
  const posts = await postsResponse.json();
  const filteredPosts = posts.data.filter(post => post.slug === slug);

  return filteredPosts;
}

export async function getSearch(slug) {
  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_WP}posts?slug=${slug}`, {
      next: { cache: 'no-store' }
  });
  const posts = await postsResponse.json();
  return posts.map((post) => ({
    title: post.title.rendered,
    slug: post.slug
  }));
}

// Fetch cart data
export async function getCartData() {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_Site}api/cart`, {
          next: { cache: 'no-store' }
      });
      console.log('Response:', response);

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Fetched Data:', data);

      return data;
  } catch (error) {
      console.error('Fetch error:', error);
      return { data: [] };
  }
}
