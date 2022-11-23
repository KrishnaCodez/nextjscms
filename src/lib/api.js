const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  return json.data;
}

export async function getPostsForHome() {
    const data = await fetchAPI(`
    {
        posts(first: 4) {
            edges {
                node {
                    title
                    slug
                    date
                    featuredImage {
                        node {
                            mediaDetails{
                                height
                                width
                            }
                            sourceUrl
                        }
                    }
                }
            }
        }
    }
    `);
    return data?.posts;
}